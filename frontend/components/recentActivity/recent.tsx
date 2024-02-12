import { faEnvelope, faEnvelopeOpen, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import { AccordionTitle } from "flowbite-react";
import Link from "next/link";
import React from "react";

interface RecentsProps {
  data?: any;
}

interface RecentItemProps {
  data?: any
}

export function RecentItem({ data }: RecentItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-xl font-medium text-gray-800">
          {`${data?.message.slice(0, -1)}`}
        </span>
        <span className=" text-green-500">
          {data?.senderId}
        </span>
      </div>
      <Divider />
      <div className="flex flex-col">
        <span className="pb-3">Recieved by</span>
        {data?.recievers?.map((item: any, index: number) => {
          return (
            <div className="text-xs flex gap-3 items-center">
              <span>{item?.recieverId}</span>
              {item?.isRead ? (
                <FontAwesomeIcon icon={faEnvelopeOpen} />
              ) : (
                <FontAwesomeIcon icon={faEnvelope} />
              )}
              <span className="text-blue-500">{item?.isRead ? 'Read' : 'Unread'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Recents({
  data
}: RecentsProps) {

  return (
    <Accordion
      variant="splitted"
      className="w-full"
    >
      {data && data.map((item: any, index: number) => {
        return (
          <AccordionItem
            key={item?.id}
            className="w-full"
            classNames={{
              base: 'w-full'
            }}
            title={
              <div className="flex gap-3 text-sm items-center">
                <FontAwesomeIcon className="text-slate-400" icon={faMessage} />
                <span className="text-slate-500">{item?.type}</span>
                <span className="font-medium">{new Date(item?.createdAt).toLocaleString()}</span>
              </div>
            }
          >
            {
              <RecentItem data={item} />
            }
          </AccordionItem>
        )
      })}
    </Accordion>

  );
}
