import client from "@/gql/client";
import { SEARCH_STORE_ITEMS } from "@/gql/query";
import { useLazyQuery } from "@apollo/client";
import { Button, Input } from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formButtonStyles } from "../styles";
import SearchItem from "./searchItem";
import AddedItem from "./addedItem";

interface Props {
  onNext: () => void,
  onBack: () => void;
  formInputStyles: any,
  onDataSubmit?: (data: any) => void
  savedData?: any
}

export default function AddItemsBlock({ savedData, onNext, onBack, formInputStyles, onDataSubmit }: Props) {

  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState<any>([]);

  const [searchRequestItems, { loading, error, data }] = useLazyQuery(SEARCH_STORE_ITEMS, { client });

  const handleVerify = useCallback(() => {
    onDataSubmit && onDataSubmit({ requestItems: addedItems });
    onNext();
  }, [onDataSubmit, onNext, addedItems]);

  const handleAddItems = (item: any) => {
    // Check if the item with the same id already exists in addedItems
    if (!addedItems?.some((addedItem: any) => addedItem.id === item.id)) {
      // If not, add the item to the addedItems array with the initial qty value
      setAddedItems((prevItems: any) => [
        ...(prevItems || []),
        { ...item, qty: 1 } // Set the initial qty value to 1 or any default value you prefer
      ]);
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

  const handleGetAddedItemData = useCallback((updatedItem: any) => {
    setAddedItems((prevItems: any) => {
      const updatedItems = prevItems.map((item: any) =>
        item.id === updatedItem.id ? { ...item, qty: updatedItem.qty } : item
      );
      return updatedItems;
    });
  }, []);

  useEffect(() => {
    console.log(addedItems);
  }, [addedItems])

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery])

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
          onClear={() => setSearchQuery('')}
          label="Search items"
          labelPlacement='outside'
          placeholder='Enter Name'
          radius='none'
          onChange={(e) => setSearchQuery(e.target.value)}
          classNames={{ ...formInputStyles }}
        />

        {/* this is to render search results */}
        <div className="w-full flex flex-col gap-2 mb-5">
          {searchQuery && data &&
            data?.searchStoreItems?.data.map((item: any, index: number) => {
              return (<SearchItem key={item.id} data={item} onClick={handleAddItems} />)
            })
          }
        </div>

        {/* after adding items from the searched items, they will be rendered here */}
        <span className="text-sm text-left w-full font-medium">Added items</span>
        <div className='w-full flex flex-col gap-2'>
          {/* useRef to number input. 
          when handleVerify, save the latest value from number input as 'qty` for each item */}
          {addedItems?.map((item: any, index: number) => {
            return (
              <AddedItem
                key={item.id}
                data={item}
                onClick={handleRemoveItems}
                getAddedItemData={handleGetAddedItemData}
              />
            );
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