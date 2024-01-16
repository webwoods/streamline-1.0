import { Chip, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from "@nextui-org/react";
import { checkboxProps, tableClassNames } from "./tableStyles";
import { Key, useCallback, useEffect, useState } from "react";
import React from "react";
import { ActionsWithIcons } from "./actions";
import Status from "./status";
import { sortData } from "./sort";

export interface DynamicTableProps {
    headerColumns: string[];
    data?: any;
}

export default function DynamicTable({ headerColumns, data }: DynamicTableProps) {

    const [selectedKeys, setSelectedKeys] = useState<Iterable<Key> | "all" | undefined>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "date" as Key,
        direction: "ascending"
    });

    // don't edit this line
    // to modify the sorting logic, 
    // edit the sortData function in sort.ts
    const sortedData = React.useMemo(() => sortData(data, sortDescriptor), [data, sortDescriptor]);

    const renderCell = useCallback((row: any, columnKey: any) => {
        const cellValue = getKeyValue(row, columnKey);

        switch (columnKey) {
            case "status": // don't edit
                return <Status value={cellValue} status={row.status} />;
            case "actions": // don't edit
                return <ActionsWithIcons />;
            // add more cases here
            default:
                return cellValue;
        }
    }, []);

    return (
        // don't edit this table.
        // data should be passed in as a prop to the DynamicTable component
        // and it will render the rows.
        // any customization needed for rows,
        // must be done inside the renderCell function above.
        <Table
            aria-label="Dynamic table"
            checkboxesProps={checkboxProps}
            classNames={tableClassNames}
            shadow="none"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            isVirtualized
        >
            <TableHeader>
                {headerColumns.map((column, index) => {
                    return (
                        <TableColumn key={column} allowsSorting>{column.toUpperCase()}</TableColumn>
                    )
                })}
            </TableHeader>
            <TableBody
                emptyContent={"No rows to display."}
            >
                {sortedData?.map((row: any) =>
                    <TableRow key={row.id}>
                        {(columnKey) => <TableCell key={columnKey}>
                            {renderCell(row, columnKey)}
                        </TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}