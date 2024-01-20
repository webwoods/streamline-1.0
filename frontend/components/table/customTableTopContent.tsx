import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statusOptions, users } from "./data";
import { capitalize } from "./utils";

interface Props {
    filterValue: string;
    onClear: () => void;
    onSearchChange: (value: string) => void;
    statusFilter: any;
    setStatusFilter: any;
}

export default function CustomTableTopContent({ filterValue, onClear, onSearchChange, statusFilter, setStatusFilter }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-center">
                <Input
                    isClearable
                    variant="underlined"
                    className="w-full sm:max-w-[44%] text-slate-500"
                    placeholder="Search by name..."
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                    classNames={{
                        base: 'rounded-md overflow-hidden',
                        input: ['bg-transparent'],
                        innerWrapper: 'bg-transparent p-2',
                        inputWrapper: ['bg-white', 'hover:!bg-slate-200', 'focus-within:!bg-slate-100', 'text-slate-500']
                    }}
                />
                <div className="flex gap-3">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex sm:items-center">
                            <div className="flex gap-3 justify-center items-center text-gray-500 hover:text-accent-blue p-2 rounded-xl text-sm px-3">
                                <FontAwesomeIcon icon={faFilter} /> Filter
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            selectionMode="multiple"
                            onSelectionChange={setStatusFilter}
                        >
                            {statusOptions.map((status) => (
                                <DropdownItem key={status.uid} className="capitalize">
                                    {capitalize(status.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex gap-1 items-center text-sm  text-gray-500">
                    <div className="pr-3">Rows</div>
                    {[5, 10, 15].map((row) => (
                        <div className="flex justify-center items-center bg-green-400 p-1 rounded-md w-7 aspect-square hover:bg-slate-800 text-white" key={row}>{row}</div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total {users.length} users</span>
            </div>
        </div>
    );
}