'use client'
import { faFileCircleExclamation, faFileCirclePlus, faMoneyCheckDollar, faTriangleExclamation, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActionButton({ props }: Readonly<{ props: any }>) {

  function getIcon(key: string | undefined) {
    switch (key) {
      case 'new':
        return <FontAwesomeIcon size='xl' icon={faFileCirclePlus} />;
      case 'pending-request':
        return <FontAwesomeIcon size='xl' icon={faTriangleExclamation} />
      case 'purchase-order':
        return <FontAwesomeIcon size='xl' icon={faMoneyCheckDollar} />;
      case 'vendor-responses':
        return <FontAwesomeIcon size='xl' icon={faTruckFast} />;
      default:
        return;
    }
  }
  
  return (
    // <div className='bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 rounded-lg p-3 flex flex-col gap-2 hover:bg-gradient-to-br hover:from-accent-yellow hover:to-yellow-200 hover:text-cprimary'>
    <div className='bg-gradient-to-r from-white to-sky-100 text-slate-800 rounded-lg p-3 flex flex-col gap-2 hover:text-teal-500 drop-shadow-md'>
      <div className='grid grid-cols-3'>
        <h5 className='text-xs col-span-2 font-semibold'>{props.title}</h5>
        <div className='flex justify-end items-center text-teal-500'>
          {getIcon(props.icon)}
        </div>
      </div>
    </div>
  )
}