import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import { checkboxProps, tableClassNames } from "./tableStyles";

export interface DynamicTableProps {
    headerColumns: string[];
}

export default function DynamicTable({ headerColumns }: DynamicTableProps) {
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
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
    );
}