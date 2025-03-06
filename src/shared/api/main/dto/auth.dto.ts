import type { AccountPermissions } from "./accounts.dto";

export interface AuthLoginCredential {
  email: string;
  password: string;
}

export interface AuthJwtRefreshCredential {
  refreshToken: string;
}

export interface AuthLoginData {
  id: number;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  permissions?: AccountPermissions;
}
