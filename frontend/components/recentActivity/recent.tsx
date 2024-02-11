import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface RecentsProps {
  id:string
  date: string;
  description: string;
  type:string;
  viewDetailsLink?: string;
  viewDetailsLinkText?: string;
}

export default function Recents({
  id,
  date,
  description,
  type,
  viewDetailsLink,
  viewDetailsLinkText,
}: RecentsProps) {
  return (
    <Accordion variant="splitted" className="px-20">
      <AccordionItem key={id} aria-label={description} title={type} className="mb-2">
      <div className="w-full text-sm py-2 px-3 my-2 bg-transparent">
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
      </AccordionItem>
    </Accordion>

  );
}
