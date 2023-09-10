import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { TypeOf, date, object, string } from "zod";
import { addNewVacationService } from "./service";
import { useNavigate } from "react-router-dom";

const newVacationSchema = object({
    destination: string(),
    description: string(),
    startDate: date(),
    endDate: date(),
    price: string(),
    imageFileName: string()
});

type newVacationInput = TypeOf<typeof newVacationSchema>;

const AddVacation = () => {
    const navigate = useNavigate();
    const methods = useForm<newVacationInput>({
        resolver: zodResolver(newVacationSchema),
    });

    async function addNewVacation() {
        const vacation = {
            destination: methods.getValues("destination"),
            description: methods.getValues("description"),
            startDate: methods.getValues("startDate"),
            endDate: methods.getValues("endDate"),
            price: methods.getValues("price"),
            imageFileName: methods.getValues("imageFileName")
        };

        console.log("add vacation", vacation);

        const result = await addNewVacationService(vacation);
        console.log( "result" ,result);
        navigate("/vacations")

    }

    return (
        <div>
            <h1>add vacation</h1>
            <FormProvider {...methods}>
                <form id="form">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        Destination
                        <input type="text" {...methods.register("destination")} />
                        {methods.formState.errors.destination && <span>{methods.formState.errors.destination.message}</span>}
                        Description of the vacation
                        <input type="text" {...methods.register("description")} />
                        {methods.formState.errors.description && <span>{methods.formState.errors.description.message}</span>}
                        Start Date
                        <input type="date" {...methods.register("startDate")} />
                        {methods.formState.errors.startDate && <span>{methods.formState.errors.startDate.message}</span>}
                        End Date
                        <input type="date" {...methods.register("endDate")} />
                        {methods.formState.errors.endDate && <span>{methods.formState.errors.endDate.message}</span>}

                        Price
                        <input type="price" {...methods.register("price")} />
                        {methods.formState.errors.price && <span>{methods.formState.errors.price.message}</span>}
                        Image
                        <input type="text" {...methods.register("imageFileName")} />
                        {methods.formState.errors.imageFileName && <span>{methods.formState.errors.imageFileName.message}</span>}
                    </div>
                    <button type="button"  onClick={addNewVacation}>Send</button>
                </form>
            </FormProvider>
        </div>
    );
}

export default AddVacation;




