import React, { useEffect, useState } from 'react';
import DataTable from 'components/molecules/DataTable/DataTable';
import ClientTableRow from 'components/molecules/ClientsTableRow/ClientsTableRow';
import { useClients, ClientProp } from 'hooks/useClients';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper.styles';

const headers = ['ID', 'Imię', 'Nazwisko', 'Nr paszportu/pesel', 'Email', 'Telefon', 'Kategoria prawa jazdy', 'Zablokowany', 'Komentarz'];

const ClientsTable: React.FC = () => {
    const [clients, setClients] = useState<ClientProp[]>();
    const status = 'Ładowanie...';
    const { getClients, deleteClient } = useClients();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const clients = await getClients();
        setClients(clients);
    };

    const handleDeleteClient = async (id: number) => {
        await deleteClient(id);
        fetchData();
    };

    return (
        <ViewWrapper>
            <DataTable tableHeaders={headers}>
                {clients ? clients.map((client) => (<ClientTableRow handleDeleteClient={handleDeleteClient} key={client.id} clientData={client} />)) : <tr><th>{status}</th></tr>}
            </DataTable>
        </ViewWrapper>
    );
};

export default ClientsTable;