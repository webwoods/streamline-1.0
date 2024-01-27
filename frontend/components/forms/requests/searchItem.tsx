import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@nextui-org/react";

export default function SearchItem({ data, onClick }: { data: any, onClick: (data: any) => void }) {
    const inStock = data.stock > 0;
  
    return (
      <div className="text-tiny w-full flex justify-between items-center border-slate-300 border-1 rounded-md p-2">
        <div className="flex flex-col pl-3">
          <span className="text-slate-400">{data.sku}</span>
          <span className="font-semibold">{data.name}</span>
        </div>
  
        <div className="flex justify-end gap-2 items-center">
          <div className="flex flex-col items-end">
            <span className={`${inStock ? 'text-green-500' : 'text-red-500'}`}>
              {inStock ? "In stock" : "Out of stock"}
            </span>
            <span>{data.price} LKR</span>
          </div>
          <Tooltip content='Add item' className="text-tiny">
            <Button
              onClick={() => onClick(data)}
              isIconOnly
              className="bg-transparent text-green-500"
            >
              <FontAwesomeIcon size="lg" icon={faPlusSquare} />
            </Button>
          </Tooltip>
        </div>
      </div>
    )
  }