import type { Account } from "@/shared/api/main";

export interface AccountsEditState {
  account: Account | null;
  accountCopy: Account | null;
  isUpdated: boolean;
}
