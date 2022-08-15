import { useCallback } from "react";
import { roleModeVar } from "../../apollo";
import { UserRoleType } from "../../__generated__/globalTypes";
import { LOCALSTORAGE_ROLE_MODE } from "../constants";

export default function useRole(): [UserRoleType | undefined, (value: UserRoleType) => void] {
  const role = roleModeVar() || UserRoleType.User

  const setRole = useCallback((value: UserRoleType) => {
    localStorage.setItem(LOCALSTORAGE_ROLE_MODE, value);
    roleModeVar(value)
  }, []);

  return [role, setRole];
}
