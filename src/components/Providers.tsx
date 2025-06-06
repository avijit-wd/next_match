"use client";

import { getUnreadMessageCount } from "@/app/actions/messageActions";
import useMessageStore from "@/hooks/useMessageStore";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({
  children,
  userId,
  profileComplete,
}: {
  children: ReactNode;
  userId: string | null;
  profileComplete: boolean;
}) {
  const isUnreadCountRef = useRef<boolean | null>(false);
  const { updateUnreadCount } = useMessageStore();
  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountRef.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
      isUnreadCountRef.current = true;
    }
  }, [setUnreadCount]);

  return (
    <SessionProvider>
      <NextUIProvider>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          className="z-50"
        />
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}
