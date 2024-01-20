import { SortDescriptor } from "@nextui-org/react";

export const sortData = (data: any, sortDescriptor: SortDescriptor) => {
    // console.log("sort data", data);
    type Data = typeof data[0];

    if (!sortDescriptor.column) {
        return data;
    }

    const sorted = [...data].sort((a: Data, b: Data) => {
        let first = a[sortDescriptor.column as keyof Data];
        let second = b[sortDescriptor.column as keyof Data];

        if (sortDescriptor.column === "date") {
            // Parse date strings into Date objects
            first = new Date(first);
            second = new Date(second);
        } else {
            first = (parseInt(first) || first);
            second = (parseInt(second) || second);
        }

        let cmp = first < second ? -1 : 1;

        if (sortDescriptor.direction === "descending") {
            cmp *= -1;
        }

        return cmp;
    });

    return sorted;
};