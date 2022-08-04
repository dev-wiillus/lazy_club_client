import NavBar from "./NavBar";
import useRole from "../utils/hooks/useRole";

export default function Layout({ children }: any) {
  const [, , notRole] = useRole();

  if (notRole) {
    return children;
  }

  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
