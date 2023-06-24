import React from 'react';
import { StyledTable } from './DataTable.styles';

interface DataTableProps {
    tableHeaders: string[];
    children: React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ tableHeaders, children }) => {
    return (
        <StyledTable>
            <thead>
                <tr>{tableHeaders.map((header) => (<th key={header}>{header}</th>))}</tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </StyledTable>
    );
};

export default DataTable;