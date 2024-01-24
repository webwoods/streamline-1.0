import { Button, Chip, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from "@nextui-org/react";
import { checkboxProps, tableClassNames } from "./tableStyles";
import { Key, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    onPaginationChange?: (page: number, pageSize: number) => void
    getRowData?: (data: any, rowId: string) => typeof data[0]
}

export default function DynamicTable({ headerColumns, data, pageNumber, pageSize, total, onPaginationChange, getRowData }: DynamicTableProps) {

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
        // don't edit
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        // don't edit
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    // function to get the relevant view data from the row
    // when the view action button is clicked
    const handleViewClick = useCallback((rowId: any) => {
        console.log("Handling View click for row:", rowId);
        getRowData && getRowData({ data: data, action: 'view' }, rowId);
    }, []);

    // function to get the relevant edit data from the row
    // when the view action button is clicked
    const handleEditClick = useCallback((rowId: any) => {
        console.log("Handling Edit click for row:", rowId);
        getRowData && getRowData({ data: data, action: 'edit' }, rowId);
    }, []);

    // function to get the relevant delete data from the row
    // when the view action button is clicked
    const handleDeleteClick = useCallback((rowId: any) => {
        console.log("Handling Delete click for row:", rowId);
        getRowData && getRowData({ data: data, action: 'delete' }, rowId);
    }, []);

    const MemoizedActionsWithIcons = useMemo(() => (
        // the state of the actions buttons for each row is memoized
        // inorder to prevent unneccessary re-renders
        ({ row }: { row: any }) => (
            <ActionsWithIcons
                id={row.id}
                onViewClick={handleViewClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />
        )
    ), [handleViewClick, handleEditClick, handleDeleteClick]);

    const renderCell = useCallback((row: any, columnKey: any) => {
        // this function is rendering cells of the table
        // each column can be styled under the switch case
        const cellValue = getKeyValue(row, columnKey);
        switch (columnKey) {
            case "status": // don't edit
                return <Status value={cellValue} status={row.status} />;
            case "actions": // don't edit
                return <MemoizedActionsWithIcons row={row} />;
            // add more cases here
            default:
                return <span className="text-xs">{cellValue}</span>;
        }
    }, [MemoizedActionsWithIcons]);

    const bottomContent = React.useMemo(() => {
        // don't edit
        // contains pagination controls

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
                        <TableColumn
                            key={column}
                            allowsSorting>
                            {column.toUpperCase()}
                        </TableColumn>
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