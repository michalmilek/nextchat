import React from "react";
import Image from "next/image";

interface Props {
  image: string | null;
  alt: string;
  online?: boolean;
}

const Avatar = ({ image, alt, online = true }: Props) => {
  return (
    <div className="flex items-center relative w-8 h-8 flex-shrink-0">
      <Image
        src={image ? image : "/avatarPlaceholder.jpg"}
        alt={alt}
        fill
        className="rounded-full mr-2"
      />
      {online && (
        <div className="w-2 h-2 top-0 right-0 absolute bg-green-500 rounded-full self-end"></div>
      )}
    </div>
  );
};

export default Avatar;
