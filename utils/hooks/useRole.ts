import { useCallback } from "react";
import { roleModeVar } from "../../apollo";
import { LOCALSTORAGE_ROLE_MODE } from "../constants";

export default function useRole(): [string, (value: 'user' | 'creator') => void] {
  const role = roleModeVar() ?? 'user'

  const setRole = useCallback((value: 'user' | 'creator') => {
    localStorage.setItem(LOCALSTORAGE_ROLE_MODE, value);
    roleModeVar(value)
  }, []);

  return [role, setRole];
}
