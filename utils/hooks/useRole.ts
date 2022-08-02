import { NextRouter, useRouter } from "next/router";
import { useMemo } from "react";

export default function useRole(): [string, NextRouter, boolean] {
  const router = useRouter();
  const role = useMemo(() => router.pathname.split("/")[1], [router.pathname]);

  const notRole = useMemo(() => !["user", "creator"].includes(role), [role]);
  return [role, router, notRole];
}
