import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { TypeOf, object, string, date, number, coerce } from 'zod';
import { addNewVacationService } from './service';
import { useNavigate } from 'react-router-dom';

const newVacationSchema = object({
    destination: string().nonempty('destination must be filled!'),
    description: string().nonempty('description must be filled!'),
    startDate: coerce.date().min(new Date(Date.now()), 'Start date must be after today'),
    endDate: coerce.date(),// string().nonempty().transform((str) => new Date(str)),
    price: coerce.number().nonnegative("canot get negative price").max(10000, "canot get more than 10,000"),
    imageFileName: string().nonempty('imageFileName must be filled!'),
});

type newVacationInput = TypeOf<typeof newVacationSchema>;

const AddVacation = () => {
    const navigate = useNavigate();
    const methods = useForm<newVacationInput>({
        resolver: zodResolver(newVacationSchema),
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: newVacationInput) => {
        console.log('add vacation', data);
        if (data.endDate< data.startDate) {
            window.alert("End date cannot be earlier than start date.");
        }

        // console.log("formState", formState);
        const result = await addNewVacationService(data);
        console.log('result', result);
        navigate('/vacations');
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
