import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Tooltip } from "@nextui-org/react"

interface ToolTipButtonProps {
    id?: string
    content: string
    icon?: IconDefinition
    onClick: (value: any) => void
    color?: any
    link?: string
}


export default function ToolTipButton({ id, content, icon, onClick, color = "default", link }: ToolTipButtonProps) {
    return (
        <Tooltip content={content}>
            <Button isIconOnly color={color} size="sm" variant="light" aria-label={content} onClick={() => { onClick(id) }}>
                <span className="text-default-400 cursor-pointer active:opacity-50">
                    <FontAwesomeIcon color={color === "danger" ? "red" : "gray"} icon={icon || faEye} />
                </span>
            </Button>
        </Tooltip>
    );
}
