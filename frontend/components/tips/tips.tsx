'use client'

import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const tipMessages = [
  "Check vendor ratings before finalizing orders. Prioritize suppliers with high performance scores for better service quality",
  "Always compare prices from different suppliers to get the best deal for your purchases.",
  "Take advantage of discounts and promotions to save on procurement costs.",
  "Regularly review and update your inventory to ensure accurate stock levels.",
  "Consider negotiating terms and prices with suppliers to establish beneficial partnerships.",
  "Use technology to streamline procurement processes and improve efficiency.",
];

export default function Tips() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % tipMessages.length);
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="py-10 px-10 w-full max-w-screen-2xl">
      <div className="p-4 border-dashed border-1 border-[#197dfd] rounded-2xl bg-gradient-to-r from-white to-sky-50">
        <div className="flex items-center gap-2 text-slate-900">
          <p className="font-semibold hover:text-[#197dfd]">Tips and Reminders</p>
          <FontAwesomeIcon size="sm" icon={faLightbulb} color="#197dfd" />
        </div>
        <p className="text-sm text-slate-900">
          “{tipMessages[currentMessageIndex]}”
        </p>
      </div>
    </div>
  );
}
