"use client";
import React, { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

export default function MessageSidebar() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string>(
    searchParams.get("container") || "inbox"
  );
  const items = [
    { key: "inbox", label: "Inbox", icon: GoInbox, chip: true },
    { key: "outbox", label: "Outbox", icon: MdOutlineOutbox, chip: true },
  ];
  return (
    <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
      {items.map(({ key, label, icon: Icon, chip }) => (
        <div
          key={key}
          className={clsx("flex flex-row items-center rounded-t-lg gap-2 p-3", {
            "text-secondary font-semibold": selected === key,
            "text-black hover:text-secondary/70": selected !== key,
          })}
          onClick={() => {}}
        >
          <Icon size={24} />
        </div>
      ))}
    </div>
  );
}
