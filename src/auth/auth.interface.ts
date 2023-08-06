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
  verificationToken: string;
}

export interface VerifyValidationCodeRequest {
  verificationToken: string;
  code: string;
}

export interface VerifyValidationCodeResponse {
  message: string;
}
