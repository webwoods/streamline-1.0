import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { IconDefinition, faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "framer-motion";

interface ToolTipButtonProps {
    id?: string
    content: string
    icon?: IconDefinition
    onClick: (value: any) => void
    color?: any
}

interface ActionsWithIconsProps {
    id: string
    onViewClick: (row: any) => void
    onEditClick: (row: any) => void
    onDeleteClick: (row: any) => void
}

function ToolTipButton({ id, content, icon, onClick, color = "default" }: ToolTipButtonProps) {
    return (
        <Tooltip content={content}>
            <Button isIconOnly color={color} size="sm" variant="light" aria-label={content} onClick={() => {onClick(id)}}>
                <span className="text-default-400 cursor-pointer active:opacity-50">
                    <FontAwesomeIcon color={color === "danger" ? "red" : "gray"} icon={icon || faEye} />
                </span>
            </Button>
        </Tooltip>
    );
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