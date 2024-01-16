import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { checkboxProps, tableClassNames } from "./tableStyles";

export interface DynamicTableProps {
    headerColumns: string[];
    data?: any;
}

export default function DynamicTable({ headerColumns, data }: DynamicTableProps) {
    return (
        <Table
            aria-label="Example empty table"
            checkboxesProps={checkboxProps}
            classNames={tableClassNames}
            shadow="none"
        >
            <TableHeader>
                {headerColumns.map((column, index) => {
                    return (
                        <TableColumn key={column}>{column.toUpperCase()}</TableColumn>
                    )
                })}
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
                {data?.map((row: any) =>
                    <TableRow key={row.id}>
                        {(columnKey) => <TableCell key={columnKey}>{getKeyValue(row, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}