import type { AuthLoginData } from "@/shared/api/main";
import type { AccountRole } from "@/shared/api/main/dto/roles.dto";

export interface AppState {
  account: AuthLoginData | null;
  roles: AccountRole[];
  tokents: {
    accessToken: string;
    refreshToken: string;
  };
  isAppLoading: boolean;
}
