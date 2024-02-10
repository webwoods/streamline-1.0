import Link from "next/link";
import React from "react";

interface RecentsProps {
  date: string;
  description: string;
  viewDetailsLink?: string;
  viewDetailsLinkText?: string;
}

export default function Recents({
  date,
  description,
  viewDetailsLink,
  viewDetailsLinkText,
}: RecentsProps) {
  return (
    <div className="w-full text-sm py-2 px-3 my-2 shadow-sm rounded-md bg-white">
      <div className="grid grid-cols-4 gap-4">
        <p className="col-start-1 col-end-2 text-[#8E96A3]">{date}</p>
        <p className="col-start-2 col-end-5 text-slate-900">{description}</p>
        {viewDetailsLink && viewDetailsLinkText ? (
          <>
            <Link href={viewDetailsLink} className="col-start-5 col-end-6 text-[#197DFD] w-60 text-right">
              <i>
                {viewDetailsLinkText}
              </i>
            </Link>
          </>
        ) : (<></>)}
      </div>
    </div>
  );
}
