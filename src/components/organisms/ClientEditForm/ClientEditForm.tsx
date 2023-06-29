import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClients, ClientProps } from "hooks/useClients";
import ClientForm, { formValuesProps } from "../ClientForm/ClientForm";

const ClientPropsToFormValues = (client: ClientProps): formValuesProps => {
    return { ...client, isBlocked: client.isBlocked.toString() };
};

const ClientEditForm = () => {
    const { editClientID } = useParams();
    const [editClient, setEditClient] = useState<ClientProps>();
    const { getClient } = useClients();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (editClientID) {
            const client = await getClient(parseInt(editClientID));
            setEditClient(client);
        }

    };

    if (editClient) {
        return (
            <>
                <ClientForm method="edit" initialformValues={ClientPropsToFormValues(editClient)} clientEditID={editClient?.id} />
            </>
        );
    } else {
        return (<></>);
    }

};

export default ClientEditForm;