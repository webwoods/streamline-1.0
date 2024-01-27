import client from "@/gql/client";
import { SEARCH_REQUEST_ITEMS } from "@/gql/query";
import { useLazyQuery } from "@apollo/client";
import { faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip, Input, Tooltip } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formButtonStyles } from "../styles";

interface Props {
  onNext: () => void,
  onBack: () => void;
  formInputStyles: any,
  onDataSubmit?: (data: any) => void
  savedData?: any
}

function Item({ data, onClick }: { data: any, onClick: (data: any) => void }) {
  const inStock = data.quantity > 0;

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

function AddedItem({ data, onClick }: { data: any, onClick: (data: any) => void }) {
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

export default function AddItemsBlock({ savedData, onNext, onBack, formInputStyles, onDataSubmit }: Props) {

  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState<any>([]);

  const [searchRequestItems, { loading, error, data }] = useLazyQuery(SEARCH_REQUEST_ITEMS, { client });

  const handleVerify = useCallback(() => {
    onDataSubmit && onDataSubmit({ requestItems: addedItems });
    onNext();
  }, [onDataSubmit, onNext, addedItems]);

  const handleAddItems = (item: any) => {
    // Check if the item with the same id already exists in addedItems
    if (!addedItems?.some((addedItem: any) => addedItem.id === item.id)) {
      // If not, add the item to the addedItems array
      setAddedItems((prevItems: any) => [...(prevItems || []), item]);
      // console.log('Item added!');
    } else {
      // console.log('Item already exists!');
      alert('Item already exists!');
    }
  };

  const handleRemoveItems = (itemToRemove: any) => {
    // Use the functional form of setAddedItems to ensure you're working with the latest state
    setAddedItems((prevItems: any) => {
      // Filter out the item with the specified id
      const updatedItems = prevItems.filter((item: any) => item.id !== itemToRemove.id);
      // console.log('Item removed!');
      return updatedItems;
    });
  };  
  
  const handleSearch = useDebouncedCallback(
    // function
    (_value) => {
      if (searchQuery !== "") {
        searchRequestItems({
          variables: { page: 1, pageSize: 10, searchString: searchQuery },
        });
      }
    },
    // delay in ms
    1000
  );

  // delete this in prod
  // useEffect(() => {
  //   console.log(data?.searchRequestItems);
  // }, [data]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery])

  // delete this in prod
  // useEffect(() => {
  //   console.log('added items updated', addedItems);
  // }, [addedItems]);

  return (
    <div className='w-96 max-w-3xl py-10'>
      <div className="flex items-center justify-center flex-col">
        <h1 className="leading-5 font-semibold text-lg">Add items</h1>
        <h2 className="text-slate-400 text-sm">Request</h2>
      </div>

      <div className='flex flex-col items-center pt-10 gap-3'>

        {/* this is the search bar */}
        <Input
          isClearable
          label="Search items"
          labelPlacement='outside'
          placeholder='Enter Name'
          radius='none'
          onChange={(e) => setSearchQuery(e.target.value)}
          classNames={{ ...formInputStyles }}
        />

        {/* this is to render search results */}
        <div className="w-full flex flex-col gap-2 mb-5">
          {data &&
            data?.searchRequestItems?.data.map((item: any, index: number) => {
              return (<Item key={item.id} data={item} onClick={handleAddItems} />)
            })
          }
        </div>

        <span className="text-sm text-left w-full font-medium">Added items</span>

        <div className='w-full flex flex-col gap-2'>
          {addedItems?.map((item: any, index: number) => {
            return (<AddedItem key={item.id} data={item} onClick={handleRemoveItems} />);
          })}
        </div>

        <div className='w-full flex gap-3 pt-5'>
          <Button
            className={formButtonStyles.secondary}
            onClick={onBack}>Back</Button>
          <Button
            className={formButtonStyles.primary}
            onClick={handleVerify}>Verify</Button>
        </div>

      </div>
    </div>
  );
}