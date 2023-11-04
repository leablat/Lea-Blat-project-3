import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { TypeOf, object, string, coerce } from 'zod';
import { addNewVacationService } from './service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loader } from '../../ui-components/loader';

const newVacationSchema = object({
    destination: string().nonempty('description must be filled!'),
    description: string().nonempty('description must be filled!'),
    startDate: coerce.date().min(new Date(Date.now()), 'Start date must be after today'),
    endDate: coerce.date(),
    price: coerce.number().nonnegative("canot get negative price").min(1, "price must be filled!").max(10000, "canot get more than 10,000"),
    imageFileName: string().nonempty('imageFileName must be filled!'),
});

type newVacationInput = TypeOf<typeof newVacationSchema>;

const AddVacation = () => {
    const [LaoderStatus, setLaoderStatus] = useState(false);
    const [correctDate, setCorrectDate] = useState("")
    const navigate = useNavigate();
    const methods = useForm<newVacationInput>({
        resolver: zodResolver(newVacationSchema),
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: newVacationInput) => {
        const formattedData = {
            ...data,
            startDate: new Date(data.startDate).toISOString().slice(0, 10),
            endDate: new Date(data.endDate).toISOString().slice(0, 10)
        };
        if (formattedData.endDate < formattedData.startDate) {
            setCorrectDate('End date cannot be earlier than start date.');
        } else {
            try {
                setLaoderStatus(true)
                await addNewVacationService(formattedData);
                navigate('/vacations');
            } catch (error: any) {
                if (error.message == '401') {
                    navigate('/login')
                }
                alert('Failed to add vacation. the error is: ' + error);
            }
        }
        setLaoderStatus(false)
    };


    return (

        <h1>add vacation</h1> &&
            LaoderStatus ? <Loader></Loader> :
            <div className='form-container'>
                <FormProvider {...methods}>
                    <form id="form" onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            Destination
                            <input className='input-control' type="text" {...methods.register('destination')} />
                            {methods.formState.errors.destination &&
                                <span className="error">{methods.formState.errors.destination.message}</span>
                            }
                            Description of the vacation
                            <input className='input-control' type="text" {...methods.register('description')} />
                            {methods.formState.errors.description && (
                                <span className="error">{methods.formState.errors.description.message}</span>
                            )}
                            Start Date
                            <input className='input-control' type="date" {...methods.register('startDate')} />
                            {methods.formState.errors.startDate && (
                                <span className="error">{methods.formState.errors.startDate.message}</span>
                            )}
                            End Date
                            <input className='input-control' type="date" {...methods.register('endDate')} />
                            <span className="error">{correctDate}</span>
                            {methods.formState.errors.endDate && (
                                <span className="error">{methods.formState.errors.endDate.message}</span>
                            )}
                            Price
                            <input className='input-control' type="number" {...methods.register('price')} />
                            {methods.formState.errors.price && (
                                <span className="error">{methods.formState.errors.price.message}</span>
                            )}
                            Image
                            <input className='input-control' type="text" {...methods.register('imageFileName')} />
                            {methods.formState.errors.imageFileName && (
                                <span className="error">{methods.formState.errors.imageFileName.message}</span>
                            )}
                        </div>
                        <button type="submit">Send</button>
                    </form>
                </FormProvider></div>

    );
};

export default AddVacation;
