import { capitalizeFirstLetter } from "@/util/string.util";
import { Chip } from "@nextui-org/react";
import { statusColorMap } from "./statusUtil";

interface Props {
    value: string
    status: string
}

export default function Status({ value, status }: Props) {
    return (
        <Chip
            className="capitalize"
            color={statusColorMap[status]}
            size="sm"
            variant="dot"
            classNames={{ base: "border-none" }}
        >
            {capitalizeFirstLetter(value)}
        </Chip>
    );
}