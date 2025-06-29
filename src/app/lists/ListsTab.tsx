"use client";

import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useTransition } from "react";
import MemberCard from "../members/MemberCard";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  members: Member[];
  likeIds: string[];
};

export default function ListsTab({ members, likeIds }: Props) {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      id: "source",
      label: "Members I have liked",
    },
    {
      id: "target",
      label: "Members that liked me",
    },
    {
      id: "mutual",
      label: "Mutual likes",
    },
  ];

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex w-full flex-col mt-10 gap-5 relative">
      {isPending && (
        <Spinner color="secondary" className="absolute left-[480px]" />
      )}
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {members.length > 0 && !isPending ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                {members.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    likedIds={likeIds}
                  />
                ))}
              </div>
            ) : (
              <div>No members for this filter</div>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
