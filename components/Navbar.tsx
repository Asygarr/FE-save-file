"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { status } = useSession();

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/users"}>User</Link>
              </li>
              <li>
                <Link href={"/posts"}>Post</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/users"}>User</Link>
            </li>
            <li>
              <Link href={"/posts"}>Post</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {status === "authenticated" ? (
            <button className="btn" onClick={() => signOut()}>
              Logout
            </button>
          ) : (
            <button className="btn" onClick={() => signIn()}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
