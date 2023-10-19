import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { TypeOf, object, string, coerce } from 'zod';
import { addNewVacationService } from './service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const newVacationSchema = object({
    destination: string().nonempty('destination must be filled!'),
    description: string().nonempty('description must be filled!'),
    startDate: coerce.date().min(new Date(Date.now()), 'Start date must be after today'),
    endDate: coerce.date(),
    price: coerce.number().nonnegative("canot get negative price").min(1,"price must be filled!").max(10000, "canot get more than 10,000"),
    imageFileName: string().nonempty('imageFileName must be filled!'),
});

type newVacationInput = TypeOf<typeof newVacationSchema>;

const AddVacation = () => {
    const [correctDate, setCorrectDate] = useState("")

    const navigate = useNavigate();
    const methods = useForm<newVacationInput>({
        resolver: zodResolver(newVacationSchema),
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: newVacationInput) => {
        // Format the date to the desired format
        const formattedData = {
            ...data,
            startDate: new Date(data.startDate).toISOString().slice(0, 10),
            endDate: new Date(data.endDate).toISOString().slice(0, 10)
        };
    
        console.log('add vacation', formattedData);
    
        if (formattedData.endDate < formattedData.startDate) {
            setCorrectDate('End date cannot be earlier than start date.');
        } else {
            try {
                const result = await addNewVacationService(formattedData);
                console.log('result', result);
                navigate('/vacations');
            } catch (error) {
                console.error('Failed to add vacation', error);
            }
        }
    };
    

    return (
        <div>
            <h1>add vacation</h1>
            <FormProvider {...methods}>
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        Destination
                        <input type="text" {...methods.register('destination')} />
                        {methods.formState.errors.destination && (
                            <span className="error">{methods.formState.errors.destination.message}</span>
                        )}
                        Description of the vacation
                        <input type="text" {...methods.register('description')} />
                        {methods.formState.errors.description && (
                            <span className="error">{methods.formState.errors.description.message}</span>
                        )}
                        Start Date
                        <input type="date" {...methods.register('startDate')} />
                        {methods.formState.errors.startDate && (
                            <span className="error">{methods.formState.errors.startDate.message}</span>
                        )}
                        End Date
                        <input type="date" {...methods.register('endDate')} />
                        <span className="error">{correctDate}</span>
                        {methods.formState.errors.endDate && (
                            <span className="error">{methods.formState.errors.endDate.message}</span>
                        )}
                        Price
                        <input type="number" {...methods.register('price')} />
                        {methods.formState.errors.price && (
                            <span className="error">{methods.formState.errors.price.message}</span>
                        )}
                        Image
                        <input type="text" {...methods.register('imageFileName')} />
                        {methods.formState.errors.imageFileName && (
                            <span className="error">{methods.formState.errors.imageFileName.message}</span>
                        )}
                    </div>
                    <button type="submit">Send</button>
                </form>
            </FormProvider>
        </div>
    );
};

export default AddVacation;
