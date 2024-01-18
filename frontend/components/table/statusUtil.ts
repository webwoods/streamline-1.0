import { ChipProps } from "@nextui-org/react";

export const statusColorMap: Record<string, ChipProps["color"]> = {
    "APPROVED": "success",
    "REJECTED": "danger",
    "PROCESSING": "warning",
};