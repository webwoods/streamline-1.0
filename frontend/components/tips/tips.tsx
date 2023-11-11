import React from "react";
import { BulbIcon } from "../icons";

export default function Tips() {
  return (
    <div className="container mx-auto p-10">
      <div className="p-3 border-dashed border-2 border-sky-500 rounded-2xl bg-sky-100">
        <div className="flex items-center gap-2">
          <p className="text-xl font-medium">Tips and Reminders</p>
          <div>
          <BulbIcon />
          </div>
        </div>
        <p className="text-sm pt-2">
          “Check vendor ratings before finalizing orders. Prioritize suppliers
          with high performance scores for better service quality”
        </p>
      </div>
    </div>
  );
}
