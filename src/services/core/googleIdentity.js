let googleScriptPromise = null;

const buildPromptErrorMessage = (reason = "") => {
  const normalizedReason = String(reason || "").trim().toLowerCase();
  if (normalizedReason === "unregistered_origin") {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "this origin";
    return `Google sign-in origin is not allowed. Add ${origin} to Authorized JavaScript origins in Google Cloud Console.`;
  }
  if (normalizedReason === "invalid_client") {
    return "Google client ID is invalid. Please verify VITE_GOOGLE_CLIENT_ID.";
  }
  if (normalizedReason === "missing_client_id") {
    return "Google client ID is missing. Please set VITE_GOOGLE_CLIENT_ID.";
  }
  if (normalizedReason === "secure_http_required") {
    return "Google sign-in requires HTTPS (or localhost during development).";
  }
  if (normalizedReason === "browser_not_supported") {
    return "This browser does not support Google sign-in.";
  }
  if (normalizedReason === "opt_out_or_no_session") {
    return "Please sign in to a Google account in this browser first.";
  }
  if (normalizedReason === "suppressed_by_user") {
    return "Google sign-in was dismissed by the user.";
  }
  return "Google sign-in is not available right now.";
};

const loadGoogleScript = () => {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Google sign-in is available only in browser environment."),
    );
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[data-google-identity-script="true"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google sign-in script.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentityScript = "true";
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google sign-in script."));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
};

export const requestGoogleIdToken = async (clientId) => {
  const normalizedClientId = String(clientId || "").trim();
  if (!normalizedClientId) {
    throw new Error("Google sign-in is not configured.");
  }

  await loadGoogleScript();

  if (!window.google?.accounts?.id) {
    throw new Error("Google sign-in is unavailable in this browser.");
  }

  return new Promise((resolve, reject) => {
    let completed = false;
    const timeoutId = window.setTimeout(() => {
      if (completed) return;
      completed = true;
      reject(new Error("Google sign-in timed out. Please try again."));
    }, 15000);

    window.google.accounts.id.initialize({
      client_id: normalizedClientId,
      auto_select: false,
      cancel_on_tap_outside: true,
      callback: (response) => {
        if (completed) return;
        completed = true;
        window.clearTimeout(timeoutId);
        const credential = String(response?.credential || "").trim();
        if (!credential) {
          reject(new Error("Google sign-in was cancelled."));
          return;
        }
        resolve(credential);
      },
    });

    window.google.accounts.id.prompt((notification) => {
      if (completed) return;

      const notDisplayed =
        typeof notification?.isNotDisplayed === "function" &&
        notification.isNotDisplayed();
      const skipped =
        typeof notification?.isSkippedMoment === "function" &&
        notification.isSkippedMoment();

      if (notDisplayed || skipped) {
        const reason =
          (typeof notification?.getNotDisplayedReason === "function" &&
            notification.getNotDisplayedReason()) ||
          (typeof notification?.getSkippedReason === "function" &&
            notification.getSkippedReason()) ||
          "";
        completed = true;
        window.clearTimeout(timeoutId);
        reject(new Error(buildPromptErrorMessage(reason)));
      }
    });
  });
};
