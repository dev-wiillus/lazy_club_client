import {useRouter} from "next/router";
import Link from "next/link";
import React from "react";

type NavItemType = {
    href: string;
    text: string;
}

function NavItem ({href, text}: NavItemType){
    const router = useRouter();
    return (
        <Link href={href}>
            <a className={router.pathname === href ? 'text-red-500': 'text-red-blue'}>{text}</a>
        </Link>
    )
}

const navItems: NavItemType[] = [
    {
        href: '/',
        text: 'Home'
    },
    {
        href: '/test',
        text: 'Test'
    },
    {
        href: '/api/hello',
        text: 'API'
    }
]

export default function NavBar(){
    return (
        <nav>
            {navItems.map(item => <NavItem key={item.href} {...item} />)}
        </nav>
    )
}