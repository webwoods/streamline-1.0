'use client'

import React, { ReactNode } from 'react';
interface Props {
  startContent: ReactNode;
  endContent: ReactNode;
}

export function TwoColumnLayout({ startContent, endContent }: Readonly<Props>) {
  return (
    <div className="p-10">
      <div className="">
        {startContent}
      </div>

      <div className="">
        {endContent}
      </div>

    </div>
  );
}
