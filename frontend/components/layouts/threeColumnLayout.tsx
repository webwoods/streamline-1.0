import React, { ReactNode } from 'react';

interface Props {
  startContent: ReactNode;
  middleContent: ReactNode;
  endContent: ReactNode;
}

export function ThreeColumnLayout({ startContent, middleContent, endContent }: Readonly<Props>) {
  return (
    <div className="grid grid-cols-8 py-10 gap-3">

      <div className="col-span-1 pl-10">
        {startContent}
      </div>

      <div className="col-span-5 bg-white p-10 rounded-lg">
        {middleContent}
      </div>

      <div className="col-span-2 px-10">
        {endContent}
      </div>

    </div >
  );
}
