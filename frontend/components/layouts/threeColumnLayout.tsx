'use client'

import React, { ReactNode } from 'react';
interface Props {
  startContent: ReactNode;
  middleContent: ReactNode;
  endContent: ReactNode;
}

export function ThreeColumnLayout({ startContent, middleContent, endContent }: Readonly<Props>) {
  return (
    <div className="lg:grid lg:grid-cols-7 lg:py-10 px-10 lg:px-0 lg:gap-3 grid-rows-4 grid-cols-none">
      <div className="lg:col-span-1 col-span-full lg:px-10 row-span-1">
        {startContent}
      </div>

      <div className="lg:col-span-4 col-span-full bg-white p-10 rounded-lg row-span-2">
        {middleContent}
      </div>

      <div className="lg:col-span-2 col-span-full lg:px-10 row-span-1">
        {endContent}
      </div>
    </div>
  );
}
