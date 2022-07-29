import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import Image from "next/dist/client/image";

type NavItemType = {
  href: string;
  text: string;
};

function NavItem({ href, text }: NavItemType) {
  const router = useRouter();
  return (
    <li>
      <Link href={href}>
        <a
          className={`${
            router.pathname === href ? "text-red-500" : "text-red-blue"
          } font-semibold text-sm`}
        >
          {text}
        </a>
      </Link>
    </li>
  );
}

const navItems: NavItemType[] = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/user/channels",
    text: "Channel",
  },
];

export default function NavBar() {
  return (
    <nav className="flex flex-col items-center pt-4 pb-2 gap-4 shadow">
      <Image alt="logo" src="/vercel.svg" width="100%" height="100rem" />
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
}
