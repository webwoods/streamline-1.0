'use client'

import React, { ReactNode } from 'react';
import Activity from '../activity/activityTimeLine';
import DatePicker from '../common/datePicker';
import SVGImage from '../common/image';
import Title from '../title/title';
interface Props {
  startContent: ReactNode;
  endContent: ReactNode;
}

export function TwoColumnLayout({ startContent, endContent }: Readonly<Props>) {
  return (
    <div className="w-screen min-h-screen flex justify-center">
      <div className="max-w-screen-2xl w-full p-10 grid grid-cols-5 gap-5">
        <div className="col-span-1 flex flex-col gap-3">
          <div className="pb-5">
            <SVGImage
              src="undraw_contract_re_ves9.svg"
              width={150}
              height={100}
            />
          </div>
          <Title title="Activity" />
          <DatePicker />
        </div>
        <div className="col-span-4">
          <div className="bg-white p-5 rounded-md">
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
}
