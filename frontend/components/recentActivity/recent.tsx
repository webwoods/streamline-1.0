import Link from "next/link";
import React from "react";

interface RecentsProps {
  date: string;
  description: string;
  viewDetailsLink: string;
  viewDetailsLinkText: string;
}

export default function Recents({
  date,
  description,
  viewDetailsLink,
  viewDetailsLinkText,
}: RecentsProps) {
  return (
    <div className="container mx-auto py-1 max-w-screen-lg">
      <div className="grid grid-cols-4 gap-4">
        <p className="col-start-1 col-end-2 text-slate-400">{date}</p>
        <p className="col-start-2 col-end-5 text-slate-900 text-left">{description}</p>
        <Link href={viewDetailsLink} className="col-start-5 col-end-6 text-blue-400 w-60 text-right">
          <i>
            {viewDetailsLinkText}
          </i>
        </Link>
      </div>
    </div>
  );
}
