import React from "react";
import Widget from "./widget";

export default function WidgetCollection(){
    const mockdata = [
        { title: 'Awaiting Approval', icon: 'awaiting-approval', value: 3 },
        { title: 'Pending Requisitions', icon: 'pending-request', value: 12 },
        { title: 'Purchase Orders', icon: 'purchase-order', value: 114 },
        { title: 'Vendor Responses', icon: 'vendor-responses', value: 20 }
      ]
    
      return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
          {mockdata?.map((data, index) => {
            return (
              <Widget props={{ ...data }} key={data.title} />
            )
          })}
        </div>
      )
}