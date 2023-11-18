'use client'
import { faChartGantt, faClockRotateLeft, faEllipsisVertical, faFileArrowDown, faFileCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@nextui-org/react";

export default function ActionButton({ props }: Readonly<{ props: any }>) {

  function getIcon(key: string | undefined) {
    switch (key) {
      case 'new':
        return <FontAwesomeIcon size="xs" icon={faPlus} />;
      case 'track':
        return <FontAwesomeIcon size="xs" icon={faChartGantt} />
      case 'history':
        return <FontAwesomeIcon size="xs" icon={faClockRotateLeft} />;
      case 'report':
        return <FontAwesomeIcon size="xs" icon={faFileArrowDown} />;
      default:
        return;
    }
  }

  return (
    <div className='group hover:text-cprimary rounded-lg p-3 flex flex-col gap-2 text-slate-800 bg-gradient-to-r from-white to-sky-100 min-h-[5rem]'>
      <div className='grid grid-cols-3'>
        <div className="col-span-2 flex flex-col gap-3">
          <div className='flex w-7 rounded-full justify-center items-center bg-slate-800 group-hover:bg-cprimary aspect-square text-slate-50'>
            {getIcon(props.icon)}
          </div>
          <h5 className='text-sm leading-4 whitespace-pre-line'>{props.title}</h5>
        </div>
        <div className="flex justify-end">
          {/* <Tooltip content={props.tooltip}> */}
            <FontAwesomeIcon icon={faEllipsisVertical} />
          {/* </Tooltip> */}
        </div>
      </div>
    </div>
  )
}