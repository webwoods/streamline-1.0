import React from "react";
import Widget from "./widget";

export default function WidgetCollection(){
    const mockdata = [
        { title: 'Allocated Budget', icon: 'awaiting-approval', value: "1.2%" },
        { title: 'Remaining Budget', icon: 'pending-request', value: "84.7K" },
        { title: 'Spent Percentage', icon: 'purchase-order', value: "43%" },
        { title: 'Warning Limit', icon: 'vendor-responses', value: "+0.45K" }
      ]
    
      return (
        <div className="bg-[#f5b22f] max-w-screen-lg container mx-auto py-5 px-6">
          <p className="font-semibold text-xl">Budget Summary</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 py-5'>
          {mockdata?.map((data, index) => {
            return (
              <Widget props={{ ...data }} key={data.title} />
            )
          })}
        </div>
        </div>
      )
}