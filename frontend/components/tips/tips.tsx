import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface TipsProps {
  message: string;
}

export default function Tips({ message }: TipsProps) {
  return (
    <div className="container mx-auto py-10 px-6 max-w-screen-lg">
      <div className="p-4 border-dashed border-1 border-[#197dfd] rounded-2xl bg-gradient-to-r from-white to-sky-50">
        <div className="flex items-center gap-2 text-slate-900">
          <p className="font-semibold hover:text-[#197dfd]">Tips and Reminders</p>
          <FontAwesomeIcon size="sm" icon={faLightbulb} color="#197dfd" />
        </div>
        <p className="text-sm text-slate-900">
          “{message}”
        </p>
      </div>
    </div>
  );
}
