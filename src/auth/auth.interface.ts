export interface LoginRequest {
  strategy: string;
  username: string;
  password: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  defaultAiModel: string;
}

export interface SignupRequest {
  strategy: string;
  username: string;
  password: string;
  referralCode: string;
  profile: UserProfile;
  token: string;
}

export interface AuthResponse {
  token: string;
}

export interface SendVerificationRequest {
  strategy: string;
  verifier: string; //email, mobile
}

export interface SendVerificationResponse {
  message: string;
}

export interface VerifyValidationCodeRequest {
  verifier: string;
  code: string;
  strategy: string;
}

export interface VerifyValidationCodeResponse {
  message: string;
}

export interface TokenClaim {
  id: string;
  role: string;
  mobile: string;
  email: string;
  payerId: bigint;
  planId: string;
  walletId: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface Tokens {
  token: string;
  refreshToken: string;
}

export interface LogoutResponse {
  messages: string;
}
