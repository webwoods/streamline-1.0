import React from "react";

interface RecentsProps {
    date: string;
    description: string;
    viewDetailsLink: string;
  }

export default function Recents({ date, description, viewDetailsLink } :RecentsProps) {
  return (
    <div className="container mx-auto py-10 px-6 max-w-screen-lg">
      <div className="grid grid-cols-4 gap-4">
        <p className="col-start-1 col-end-2 text-slate-400">{date}</p>
        <p className="col-start-2 col-end-5 text-slate-900">{description}</p>
        <i className="col-start-5 col-end-6 text-blue-400">{viewDetailsLink}</i>
      </div>
    </div>
  );
}
