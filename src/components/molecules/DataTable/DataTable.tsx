import React from 'react';
import { Wrapper } from './DataTable.styles';

interface DataTableProps {
    tableHeaders: string[];
    children: React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ tableHeaders, children }) => {
    return (
        <Wrapper>
            <table>
                <thead>
                    <tr>{tableHeaders.map((header) => (<th key={header}>{header}</th>))}</tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </Wrapper>
    );
};

export default DataTable;