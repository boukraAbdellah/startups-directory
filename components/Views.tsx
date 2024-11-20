import { client } from "@/sanity/lib/client";
import { GET_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";
import React from "react";

const Views = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(GET_VIEWS_QUERY, { id });

  
  // The problem of setting the update views here is that the viws
  // component won't load until the two requests are completed and
  // we won't need that

  after(async () => {
    await writeClient
      .patch(id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();
  })
  
  // For that we use Next "unstable_after" which allows you to schedule work when response is finished
  // it's used to prevent certain block of codes from blocking the response

  // We want to schedule the work after the response of getting views is done ,
  // will then update the views in the backgroud without stopping the ui

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default Views;

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  );
};
