import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { StartupCardType } from "@/app/(ROOT)/page";
import formdate from "@/utility/formdate";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";


export default function StartupCard({ post }: { post: StartupCardType }) {
  return (
    <li className="startup-card group">
      <div className=" flex flex-between">
        <p className=" startup_card_date">{formdate(post._createdAt)}</p>
        <div className=" flex gap-1.5">
          <EyeIcon className=" size-6 text-primary" />
          <span>{post.views}</span>
        </div>
      </div>
      <div className=" flex-between gap-5 mt-5">
        <div className=" flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className=" text-16-medium line-clamp-1">{post.author?.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className=" text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author?._id}`}>
          <Image
            src="https://placehold.co/150x150"
            alt={post.author?.name || "author image"}
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${post._id}`}>
        <p className="startup-card_desc">{post.description}</p>

        <img src={post.image} alt="post image" className="startup-card_img" />
      </Link>

      <div className=" flex-between gap-3 mt-5">
        <Link href={`/?query=${post.category?.toLowerCase()}`}>
          <p className=" text-16-medium ">{post.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post._id}`}>Read More</Link>
        </Button>
      </div>
    </li>
  );
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

