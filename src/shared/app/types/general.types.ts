import type { AuthLoginData } from "@/shared/api/main";

export interface AppState {
  account: AuthLoginData | null;
  tokents: {
    accessToken: string;
    refreshToken: string;
  };
  isAppLoading: boolean;
}
