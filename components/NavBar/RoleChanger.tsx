import React, { useCallback, useMemo } from "react";
import useRole from "../../utils/hooks/useRole";

export default function RoleChanger() {
  const [role, router] = useRole();

  const onRoleChange = useCallback(() => {
    if (role === "user") router.replace("/creator");
    else router.replace("/user");
  }, [role, router]);

  const [roleText, anotherRoleText] = useMemo(() => {
    const user = "유저";
    const clubber = "클러버";
    return role === "user" ? [user, clubber] : [clubber, user];
  }, [role]);

  return (
    <>
      <label
        htmlFor="confirm-role-change"
        className="btn btn-ghost modal-button gap-1 w-28"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <span className="font-medium">{roleText}</span>
      </label>
      <input
        type="checkbox"
        id="confirm-role-change"
        className="modal-toggle"
      />
      <label
        htmlFor="confirm-role-change"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="font-bold text-lg">Role 변경</h3>
          <p className="py-4">
            <span className="font-semibold text-secondary">{roleText}</span>
            -&gt;{" "}
            <span className="font-semibold text-secondary">
              {anotherRoleText}
            </span>
            로 변경하시겠습니까?
          </p>
          <div className="modal-action">
            <label htmlFor="confirm-role-change" className="btn">
              cancel
            </label>
            <label
              htmlFor="confirm-role-change"
              className="btn"
              onClick={onRoleChange}
            >
              okay
            </label>
          </div>
        </label>
      </label>
    </>
  );
}
