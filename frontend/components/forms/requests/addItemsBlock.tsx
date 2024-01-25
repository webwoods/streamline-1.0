import client from "@/gql/client";
import { SEARCH_REQUEST_ITEMS } from "@/gql/query";
import { useLazyQuery } from "@apollo/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formButtonStyles } from "../styles";

interface Props {
  onNext: () => void,
  onBack: () => void;
  formInputStyles: any,
  onDataSubmit?: (data: any) => void
}

export default function AddItemsBlock({ onNext, onBack, formInputStyles, onDataSubmit }: Props) {

  const [requestId, setRequestId] = useState('GR221');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState(["Oxygen", "Gas", "2L"]);
  const [addedItems, setAddedItems] = useState<any>();

  const [searchRequestItems, { loading, error, data }] = useLazyQuery(SEARCH_REQUEST_ITEMS, { client });

  const handleVerify = () => {
    onDataSubmit && onDataSubmit({ requestItems: addedItems });
    onNext();
  }

  const handleAddItems = (item: any) => {
    // Check if the item with the same id already exists in addedItems
    if (!addedItems?.some((addedItem: any) => addedItem.id === item.id)) {
      // If not, add the item to the addedItems array
      setAddedItems((prevItems: any) => [...(prevItems || []), item]);
      console.log('Item added!');
    } else {
      console.log('Item already exists!');
    }
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

  useEffect(() => {
    console.log(data?.searchRequestItems);
  }, [data]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery])

  useEffect(() => {
    console.log('added items updated', addedItems);
  }, [addedItems]);

  return (
    <div className='w-96 max-w-3xl py-10'>
      <div className="flex items-center justify-center flex-col">
        <h1 className="leading-5 font-semibold text-lg">Add items</h1>
        <h2 className="text-slate-400 text-sm">{requestId}</h2>
      </div>

      <div className='flex flex-col items-center pt-10 gap-3'>
        <Input
          isClearable
          label="Search items"
          labelPlacement='outside'
          placeholder='Enter Name'
          radius='none'
          onChange={(e) => setSearchQuery(e.target.value)}
          classNames={{ ...formInputStyles }}
        />

        <div className="w-full flex flex-col gap-4">
          {data &&
            data?.searchRequestItems?.data.map((item: any, index: number) => {
              return (
                <div key={item.id} className="w-full flex flex-col">
                  <p className="text-tiny flex-wrap">{JSON.stringify(item)}</p>
                  <Button onClick={() => handleAddItems(item)}>Add</Button>
                </div>
              )
            })
          }
        </div>

        {/* <div className='flex w-full gap-1'>
            {selectedTags.map((tag, index) => (
              <Chip key={index} onClose={() => console.log("close")} variant="bordered">
                {tag}
              </Chip>
            ))}
          </div> */}

        <div className='w-full flex flex-col gap-3'>
          {addedItems?.map((item: any, index: number) => {
            return (
              <div key={index} className='flex bg-slate-100 justify-between items-center p-3 rounded-[0.25rem]'>
                <div className='flex flex-col'>
                  <span>{item.name}</span>
                  <span className='text-xs'>{item.sku}</span>
                </div>
                <Input
                  type="number"
                />
                <div>{item.price} Rs</div>
                <FontAwesomeIcon icon={faTrash} />
              </div>
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