"use client";

import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { useRole } from "@/hooks/useHook";
import { Button, useDisclosure } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import clsx from "clsx";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import AppModal from "./AppModal";

type Props = {
  photo: Photo | null;
};

export default function MemberImage({ photo }: Props) {
  const role = useRole();
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();

  if (!photo) {
    return null;
  }

  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) return toast.error(error.message);
      else toast.error("Something went wrong");
    }
  };

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) return toast.error(error.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <div className="cursor-pointer" onClick={onOpen}>
      {photo?.publicId ? (
        <CldImage
          alt="image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className={clsx("rounded-xl", {
            "opacity-40": !photo.isApproved && role !== "ADMIN",
          })}
          priority
        />
      ) : (
        <Image
          width={220}
          height={220}
          src={photo?.url || "/images/user.png"}
          alt="image of user"
          className="rounded-lg"
        />
      )}
      {!photo?.isApproved && role !== "ADMIN" && (
        <div className="absolute bottom-2 w-full bg-slate-200 p-1">
          <div className="flex justify-center text-danger font-semibold">
            Awaiting approval
          </div>
        </div>
      )}
      {role === "ADMIN" && (
        <div className="flex flex-row gap-2 mt-2 ">
          <Button
            onClick={() => approve(photo.id)}
            color="success"
            variant="bordered"
            fullWidth
          >
            <ImCheckmark size={20} />
          </Button>

          <Button
            onClick={() => reject(photo)}
            color="danger"
            variant="bordered"
            fullWidth
          >
            <ImCross size={20} />
          </Button>
        </div>
      )}
      <AppModal
        imageModal={true}
        isOpen={isOpen}
        onClose={onClose}
        body={
          <>
            {photo?.publicId ? (
              <CldImage
                alt="image of member"
                src={photo.publicId}
                width={750}
                height={750}
                className={clsx("rounded-xl", {
                  "opacity-40": !photo.isApproved && role !== "ADMIN",
                })}
                priority
              />
            ) : (
              <Image
                width={750}
                height={750}
                src={photo?.url || "/images/user.png"}
                alt="image of user"
                className="rounded-lg"
              />
            )}
            {!photo?.isApproved && role !== "ADMIN" && (
              <div className="absolute bottom-2 w-full bg-slate-200 p-1">
                <div className="flex justify-center text-danger font-semibold">
                  Awaiting approval
                </div>
              </div>
            )}
            {role === "ADMIN" && (
              <div className="flex flex-row gap-2 mt-2 ">
                <Button
                  onClick={() => approve(photo.id)}
                  color="success"
                  variant="bordered"
                  fullWidth
                >
                  <ImCheckmark size={20} />
                </Button>

                <Button
                  onClick={() => reject(photo)}
                  color="danger"
                  variant="bordered"
                  fullWidth
                >
                  <ImCross size={20} />
                </Button>
              </div>
            )}
          </>
        }
      />
    </div>
  );
}
