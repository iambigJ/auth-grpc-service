import { UserProfile } from '../../auth/auth.interface';

export interface UserInterface {
  id: string;
  emailVerified: boolean;
  referralCode: string;
  payerId: string;
  planId: string;
  mobile: string;
  email: string;
  role: string;
  profile: UserProfile;
}
