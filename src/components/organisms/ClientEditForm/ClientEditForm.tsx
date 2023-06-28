import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClients, ClientFormProps, ClientProps } from "hooks/useClients";
import ClientForm from "../ClientForm/ClientForm";

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
                <ClientForm method="edit" initialformValues={editClient as ClientFormProps} clientEditID={editClient?.id} />
            </>
        );
    } else {
        return (<></>);
    }

};

export default ClientEditForm;