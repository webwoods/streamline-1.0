import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from "@nextui-org/react";
import { checkboxProps, tableClassNames } from "./tableStyles";
import { Key, useCallback, useEffect, useState } from "react";
import { statusColorMap } from "./statusUtil";
import { faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalizeFirstLetter } from "@/util/string.util";
import React from "react";

export interface DynamicTableProps {
    headerColumns: string[];
    data?: any;
}

export default function DynamicTable({ headerColumns, data }: DynamicTableProps) {

    const [selectedKeys, setSelectedKeys] = useState<Iterable<Key> | "all" | undefined>(new Set());


    const renderCell = useCallback((row: any, columnKey: any) => {
        const cellValue = getKeyValue(row, columnKey);

        switch (columnKey) {
            case "status":
                // don't edit
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[row.status]}
                        size="sm"
                        variant="dot"
                        classNames={{ base: "border-none" }}
                    >
                        {capitalizeFirstLetter(cellValue)}
                    </Chip>
                );
            case "actions":
                // don't edit
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
            aria-label="Example empty table"
            checkboxesProps={checkboxProps}
            classNames={tableClassNames}
            shadow="none"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
        >
            <TableHeader>
                {headerColumns.map((column, index) => {
                    return (
                        <TableColumn key={column}>{column.toUpperCase()}</TableColumn>
                    )
                })}
            </TableHeader>
            <TableBody
                emptyContent={"No rows to display."}
            >
                {data?.map((row: any) =>
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