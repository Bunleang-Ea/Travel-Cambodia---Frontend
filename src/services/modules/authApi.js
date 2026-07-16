import { httpRequest } from "../core/httpClient";

export const login = async (payload) =>
  httpRequest("/auth/login/", { method: "POST", body: payload });

export const register = async (payload) =>
  httpRequest("/auth/register/", { method: "POST", body: payload });

export const verifyOtp = async (payload) =>
  httpRequest("/auth/verify-otp/", { method: "POST", body: payload });

export const verifyResetOtp = async (payload) =>
  httpRequest("/auth/verify-reset-otp/", { method: "POST", body: payload });

export const googleAuthenticate = async (payload) =>
  httpRequest("/auth/google/", { method: "POST", body: payload });

export const requestResetPassword = async (payload) =>
  httpRequest("/auth/forgot-password/", { method: "POST", body: payload });

export const resetPassword = async (payload) =>
  httpRequest("/auth/reset-password/", { method: "POST", body: payload });

export const getMyProfile = async () => httpRequest("/me/");

export const updateMyProfile = async (payload) =>
  httpRequest("/me/", { method: "PUT", body: payload });

export const changePassword = async (payload) =>
  httpRequest("/me/change-password/", { method: "POST", body: payload });
