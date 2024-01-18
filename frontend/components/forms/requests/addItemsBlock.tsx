import client from "@/gql/client";
import { SEARCH_REQUEST_ITEMS } from "@/gql/query";
import { useLazyQuery } from "@apollo/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function AddItemsBlock({ onNext, onBack, formInputStyles }: { onNext: () => void, onBack: () => void; formInputStyles: any }) {

    const [requestId, setRequestId] = useState('GR221');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState(["Oxygen", "Gas", "2L"]);
    const [addedItems, setAddedItems] = useState([{
      type: "GAS",
      sku: "oxygen-2l",
      unit: "litres",
      name: "Oxygen",
      price: "58000",
      quantity: "2",
    },
    {
      type: "GAS",
      sku: "methane-2l",
      unit: "litres",
      name: "Methane",
      price: "58000",
      quantity: "2",
    },
    {
      type: "GAS",
      sku: "bromine-2l",
      unit: "litres",
      name: "Bromine",
      price: "58000",
      quantity: "2",
    }
    ]);
  
    const [searchRequestItems, { loading, error, data }] = useLazyQuery(SEARCH_REQUEST_ITEMS, { client });
  
    const handleVerify = () => {
      onNext();
    }
  
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
      console.log(data);
    }, [data]);
  
    useEffect(() => {
      handleSearch(searchQuery);
    }, [searchQuery])
  
    return (
      <div className='w-96 max-w-3xl py-10'>
        <div className="flex items-center justify-center flex-col">
          <h1 className="leading-5 font-semibold text-lg">Add items</h1>
          <h2 className="text-slate-400 text-sm">{requestId}</h2>
        </div>
  
        <div className='flex flex-col items-center pt-10 gap-3'>
          <Input
            label="Search items"
            labelPlacement='outside'
            placeholder='Enter Name'
            radius='none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            classNames={{ ...formInputStyles }} />
  
          <div className='flex w-full gap-1'>
            {selectedTags.map((tag, index) => (
              <Chip key={index} onClose={() => console.log("close")} variant="bordered">
                {tag}
              </Chip>
            ))}
          </div>
  
          <div className='w-full flex flex-col gap-3'>
            {addedItems.map((item, index) => {
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
            <Button className='w-full rounded-[0.25rem] bg-slate-200 hover:bg-slate-300' onClick={onBack}>Back</Button>
            <Button
              className='w-full rounded-[0.25rem] text-slate-50 bg-slate-800 hover:text-accent-yellow hover:bg-slate-700'
              onClick={handleVerify}>Verify</Button>
          </div>
  
        </div>
      </div>
    );
  }