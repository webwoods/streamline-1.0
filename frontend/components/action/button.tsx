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
    <div className="bg-white flex flex-col justify-center p-3 rounded-md h-20">
      <div className="w-full flex justify-between">
        {getIcon(props.icon)}
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      <span className="text-sm leading-4 whitespace-pre-line">{props.title}</span>
    </div>
  )
}