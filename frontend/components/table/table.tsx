import { Chip, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from "@nextui-org/react";
import { checkboxProps, tableClassNames } from "./tableStyles";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import React from "react";
import { ActionsWithIcons } from "./actions";
import Status from "./status";
import { sortData } from "./sort";
import BottomContent from "./bottomContent";

export interface DynamicTableProps {
    headerColumns: string[]
    data?: any
    pageNumber: number
    pageSize: number
    total: number
    onPaginationChange: (page: number, pageSize: number) => void
}

export default function DynamicTable({ headerColumns, data, pageNumber, pageSize, total, onPaginationChange }: DynamicTableProps) {

    const [selectedKeys, setSelectedKeys] = useState<Iterable<Key> | "all" | undefined>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "date" as Key,
        direction: "ascending"
    });
    const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);
    const [page, setPage] = React.useState(pageNumber);

    // don't edit this line
    // to modify the sorting logic, 
    // edit the sortData function in sort.ts
    const sortedData = useMemo(() => sortData(data, sortDescriptor), [data, sortDescriptor]);

    // const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const pages = useMemo(() => Math.ceil(total / rowsPerPage), [total, rowsPerPage]);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

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

    const bottomContent = React.useMemo(() => {
        // don't edit
        return (
            <BottomContent
                selectedKeys={selectedKeys}
                filteredItems={data}
                page={page}
                pages={pages}
                setPage={setPage}
                onPreviousPage={onPreviousPage}
                onNextPage={onNextPage}
            />
        );
    }, [selectedKeys, data.length, page, pages]);

    useEffect(() => {
        // Call the callback when page or pageSize changes
        onPaginationChange && onPaginationChange(page, rowsPerPage);
    }, [page, rowsPerPage, onPaginationChange]);

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
            bottomContent={bottomContent}
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