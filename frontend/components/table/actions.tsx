import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { IconDefinition, faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "framer-motion";
import UpdateRequest from "../forms/requests/updateRequest";
import ToolTipButton from "../common/tooltipButton";

interface ActionsWithIconsProps {
    id: string
    onViewClick: (row: any) => void
    onEditClick: (row: any) => void
    onDeleteClick: (row: any) => void
}

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

export function ActionsWithIcons({ id, onViewClick, onEditClick, onDeleteClick }: ActionsWithIconsProps) {
    const buttons = [
        {
            id: id,
            content: "View",
            icon: faEye,
            onClick: (row: any) => {
                console.log("View button clicked");
                onViewClick(row);
            }
        },
        {
            id: id,
            content: "Edit",
            icon: faPenToSquare,
            onClick: (row: any) => {
                console.log("Edit button clicked");
                onEditClick(row);
            }
        },
        {
            id: id,
            content: "Delete",
            icon: faTrashCan,
            onClick: (row: any) => {
                console.log("Delete button clicked");
                onDeleteClick(row);
            },
            color: "danger"
        }
    ];

    return (
        <div className="relative flex items-center gap-1">
            {buttons &&
                buttons.map((btn, index) => {
                    return (
                        <ToolTipButton
                            id={btn.id}
                            key={btn.content}
                            content={btn.content}
                            icon={btn.icon}
                            onClick={(row: any) => btn.onClick(row)}
                            color={btn.color}
                        />
                    );
                })
            }
        </div>
    );
}