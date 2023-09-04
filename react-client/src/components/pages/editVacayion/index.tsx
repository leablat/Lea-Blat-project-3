import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TypeOf, date, object, string } from "zod";

const newVacationSchema = object({
    destination: string(),
    description: string(),
    startDate: date(),
    endDate: date(),
    price: string(),
    imageFileName: string()
});

type newVacationInput = TypeOf<typeof newVacationSchema>;

const EditVacation = () => {
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

        // console.log("add vacation", vacation);

        // const result = await addNewVacationService(vacation);
    }

    return (
        <div>
<h1>Edit vacation</h1>
        </div>
    );
}

export default EditVacation;




