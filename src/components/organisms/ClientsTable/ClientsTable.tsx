import React, { useEffect, useState } from 'react';
import DataTable from 'components/molecules/DataTable/DataTable';
import ClientTableRow from 'components/molecules/ClientsTableRow/ClientsTableRow';
import { useClients, ClientProps } from 'hooks/useClients';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper.styles';
import { useParams } from 'react-router-dom';

const headers = ['#', 'Imię', 'Nazwisko', 'Nr paszportu/pesel', 'Email', 'Telefon', 'Kategorie prawa jazdy', 'Status', 'Komentarz'];
//const headers = ['#', 'ID', 'Imię', 'Nazwisko', 'Nr paszportu/pesel', 'Email', 'Telefon', 'Kategorie prawa jazdy', 'Status', 'Komentarz'];

const ClientsTable: React.FC = () => {
    const [clients, setClients] = useState<ClientProps[]>();
    const [status, setStatus] = useState('');
    const { getClients, deleteClient } = useClients();
    const { isBlocked } = useParams();

    const fetchData = async () => {
        setStatus('Ładowanie...');
        const clients = await getClients(isBlocked ? isBlocked === 'true' : undefined);
        if (clients?.length === 0 || !clients) {
            setStatus('Brak');
            return;
        }
        setClients(clients);
        setStatus('');
    };

    useEffect(() => {
        fetchData();
    }, [isBlocked, getClients]);

    const handleDeleteClient = async (id: number) => {
        await deleteClient(id);
        fetchData();
    };

    return (
        <ViewWrapper>
            <DataTable tableHeaders={headers}>
                {status === '' && clients ? clients.map((client, index) => (<ClientTableRow index={index} handleDeleteClient={handleDeleteClient} key={client.id} clientData={client} />)) : <tr><th>{status}</th></tr>}
            </DataTable>
        </ViewWrapper>
    );
};

export default ClientsTable;