import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GiMatchTip } from "react-icons/gi";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import { getUserInfoForNav } from "@/app/actions/userActions";

export default async function TopNav() {
  const session = await auth();

  const userInfo = session?.user && (await getUserInfoForNav());
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-purple-400 to-purple-700"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "uppercase",
          "data-[active=true]:text-yellow-200",
        ],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className="text-gray-300" />
        <div className="font-bold text-3xl flex">
          <span className="text-gray-900">Next</span>
          <span className="text-gray-300">Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink label="Matches" href="/members" />
        <NavLink label="Lists" href="/lists" />
        <NavLink label="Messages" href="/messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        {session?.user && userInfo ? (
          <UserMenu userInfo={userInfo} />
        ) : (
          <>
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              className="text-white"
            >
              Login
            </Button>
            <Button
              as={Link}
              href="/register"
              variant="bordered"
              className="text-white"
            >
              Register
            </Button>{" "}
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
