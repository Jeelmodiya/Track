import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DottedSeparator } from "./Dotted-Separator";
import Navigation from "./Navigation";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import Projects from "./Projects";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo2.svg" alt="logo" height={48} width={164} />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};

export default Sidebar;
