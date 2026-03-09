"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, Show, useUser } from "@clerk/nextjs";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
];

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();

    return (
        <header className="w-full fixed z-50 bg-gray-500">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">

                <Link href="/" className="flex gap-1 items-center">
                    <Image src="/assets/l.png" alt="echobooks" width={62} height={46} />
                    <span className="logo-text">EchoBooks</span>
                </Link>

                <nav className="flex gap-7 items-center">
                    {navItems.map(({ label, href }) => {
                        const isActive =
                            pathName === href ||
                            (href !== "/" && pathName.startsWith(href));

                        return (
                            <Link
                                key={label}
                                href={href}
                                className={cn(
                                    "nav-link-base",
                                    isActive
                                        ? "nav-link-active"
                                        : "text-black hover:opacity-70"
                                )}
                            >
                                {label}
                            </Link>
                        );
                    })}

                    <div className="flex gap-6 items-center">

                        <Show when="signed-out">
                            <SignInButton mode="modal" />
                        </Show>

                        <Show when="signed-in">
                            <div className="flex items-center gap-3">
                                <UserButton />

                                {user?.firstName && (
                                    <Link href="/subscriptions" className="nav-user-name">
                                        {user.firstName}
                                    </Link>
                                )}
                            </div>
                        </Show>

                    </div>
                </nav>

            </div>
        </header>
    );
};

export default Navbar;