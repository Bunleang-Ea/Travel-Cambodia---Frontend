import { USE_MOCK_AUTH } from "../core/apiConfig";
import { httpRequest } from "../core/httpClient";
import {
  loginMock,
  registerMock,
  requestResetPasswordMock,
  resetPasswordMock,
  verifyOtpMock,
} from "../mock/authMockApi";

export const login = async (payload) => {
  if (USE_MOCK_AUTH) return loginMock(payload);
  return httpRequest("/auth/login/", {
    method: "POST",
    body: payload,
  });
};

export const register = async (payload) => {
  if (USE_MOCK_AUTH) return registerMock(payload);
  return httpRequest("/auth/register/", {
    method: "POST",
    body: payload,
  });
};

export const verifyOtp = async (payload) => {
  if (USE_MOCK_AUTH) return verifyOtpMock(payload);
  return httpRequest("/auth/verify-otp/", {
    method: "POST",
    body: payload,
  });
};

export const requestResetPassword = async (payload) => {
  if (USE_MOCK_AUTH) return requestResetPasswordMock(payload);
  return httpRequest("/auth/forgot-password/", {
    method: "POST",
    body: payload,
  });
};

export const resetPassword = async (payload) => {
  if (USE_MOCK_AUTH) return resetPasswordMock(payload);
  return httpRequest("/auth/reset-password/", {
    method: "POST",
    body: payload,
  });
};
