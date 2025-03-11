import { API } from "../instances";
import type { AccountsPaginationData, AccountsQueryParams } from "./dto/accounts.dto";
import type { AuthJwtRefreshCredential, AuthLoginCredential, AuthLoginData } from "./dto/auth.dto";
import type { AccountRole } from "./dto/roles.dto";

export const mainApi = {
  auth: {
    login: async (credential: AuthLoginCredential): Promise<AuthLoginData> => {
      return API.post("/auth/login", credential).then((res) => res?.data);
    },
    refresh: async (credential: AuthJwtRefreshCredential): Promise<AuthLoginData> => {
      return API.post("/auth/token/refresh", credential).then((res) => res?.data);
    },
  },

  roles: {
    get: async (): Promise<AccountRole[]> => {
      return API.get("/roles").then((res) => res?.data);
    },
  },

  accounts: {
    get: async (params: AccountsQueryParams): Promise<AccountsPaginationData> => {
      return API.get("/accounts", { params }).then((res) => res?.data);
    },
  },
};
