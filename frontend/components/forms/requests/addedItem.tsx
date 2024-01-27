import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Tooltip } from "@nextui-org/react";

export default function AddedItem({ data, onClick }: { data: any, onClick: (data: any) => void }) {
    return (
      <div className='text-xs grid grid-cols-5 border-1 items-center rounded-[0.25rem] p-2'>
        <div className='flex flex-col pl-3 col-span-2'>
          <span className='text-slate-400'>{data.sku}</span>
          <span className="font-semibold">{data.name}</span>
        </div>
        <div className="col-span-1">
          <Input
            type="number"
            defaultValue='1'
            classNames={{
              base: [
                'w-15'
              ],
              input: [
                'bg-transparent',
                'text-center'
              ],
              inputWrapper: [
                'bg-transparent',
                'border-1'
              ]
            }}
          />
        </div>
        <div className="col-span-2 flex justify-end items-center">
          <span>{data.price} LKR</span>
          <Tooltip className="text-xs" content="remove item">
            <Button isIconOnly onClick={() => onClick(data)} className="text-red-500 bg-transparent">
              <FontAwesomeIcon icon={faTrash} size='sm' />
            </Button>
          </Tooltip>
        </div>
      </div>
    )
  }