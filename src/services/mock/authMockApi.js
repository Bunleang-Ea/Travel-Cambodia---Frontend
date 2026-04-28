const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginMock = async ({ email, password }) => {
  await delay();

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  return {
    token: "mock-token",
    user: {
      email,
      role: "user",
    },
  };
};

export const registerMock = async ({ email, password }) => {
  await delay();

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  return {
    success: true,
    message: "Registration successful.",
  };
};

export const verifyOtpMock = async ({ email, otp }) => {
  await delay();

  if (!email || !otp) {
    throw new Error("Email and OTP are required.");
  }

  return { success: true };
};

export const requestResetPasswordMock = async ({ email }) => {
  await delay();

  if (!email) {
    throw new Error("Email is required.");
  }

  return { success: true };
};

export const resetPasswordMock = async ({ email, otp, newPassword }) => {
  await delay();

  if (!email || !otp || !newPassword) {
    throw new Error("Email, OTP, and new password are required.");
  }

  return { success: true };
};
