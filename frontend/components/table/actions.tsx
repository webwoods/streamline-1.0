import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Actions() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export function ActionsWithIcons() {
    return (
        <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
                <span className="text-default-400 cursor-pointer active:opacity-50">
                    <FontAwesomeIcon icon={faEye} />
                </span>
            </Tooltip>
            <Tooltip content="Edit">
                <span className="text-default-400 cursor-pointer active:opacity-50">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
                <span className="text-danger cursor-pointer active:opacity-50">
                    <FontAwesomeIcon icon={faTrashCan} />
                </span>
            </Tooltip>
        </div>
    );
}