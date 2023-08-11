import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCars, CarProps } from "hooks/useCars";
import CarForm, { formValuesProps } from "../CarForm/CarForm";

const CarPropsToFormValues = (car: CarProps): formValuesProps => {
    return {
        ...car,
        enginePower: car.enginePower.toString(),
        numberOfSeats: car.numberOfSeats.toString(),
        pricePerDay: car.pricePerDay.toString(),
    };
};

const CarEditForm = () => {
    const { editCarID } = useParams();
    const [editCar, setEditCar] = useState<CarProps>();
    const { getCar } = useCars();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (editCarID) {
            const car = await getCar(parseInt(editCarID));
            setEditCar(car);
        }

    };

    if (editCar) {
        return (
            <>
                <CarForm method="edit" initialformValues={CarPropsToFormValues(editCar)} carEditID={editCar?.id} />
            </>
        );
    } else {
        return (<></>);
    }

};

export default CarEditForm;