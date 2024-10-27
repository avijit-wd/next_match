"use client";

import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React from "react";

type Props = {
  photo: Photo | null;
};

export default function MemberImage({ photo }: Props) {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className="rounded-xl"
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
    </div>
  );
}
