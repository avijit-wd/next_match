"use client";

import { getUnreadMessageCount } from "@/app/actions/messageActions";
import useMessageStore from "@/hooks/useMessageStore";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string | null;
}) {
  const isUnreadCountRef = useRef<boolean | null>(false);
  const { updateUnreadCount } = useMessageStore();
  usePresenceChannel();
  useNotificationChannel(userId);

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
    <NextUIProvider>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        className="z-50"
      />
      {children}
    </NextUIProvider>
  );
}
