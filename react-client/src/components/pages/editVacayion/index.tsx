import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { TypeOf, coerce, object, string } from "zod";
import { editVacationService, getVacationService } from "./service";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../ui-components/loader";

const editVacationSchema = object({
  destination: string().nonempty('destination must be filled!'),
  description: string().nonempty('description must be filled!'),
  startDate: coerce.date(),
  endDate: coerce.date(),
  price: coerce.number().nonnegative("canot get negative price").min(1, "price must be filled!").max(10000, "canot get more than 10,000"), imageFileName: string(),
});

type editVacationInput = TypeOf<typeof editVacationSchema>;

const EditVacation = () => {
  const [dateError, setDateError] = useState("")
  const navigate = useNavigate();
  const { vacationId } = useParams();
  const methods = useForm<editVacationInput>({
    resolver: zodResolver(editVacationSchema),
  });

  const [vacation, setVacation] = useState<editVacationInput | null>(null);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const vacationData = await getVacationService(vacationId);
        // Convert Date objects to string for default values
        vacationData.startDate = new Date(vacationData.startDate).toISOString().split("T")[0];
        vacationData.endDate = new Date(vacationData.endDate).toISOString().split("T")[0];
        setVacation(vacationData);
      } catch (error) {
        console.log("Error fetching vacation data:", error);
      }
    }
    
    fetchData();
  }, [vacationId]);

  const { handleSubmit } = methods;;
  const onSubmit = async (data: editVacationInput) => {
    const formattedData = {
      ...data,
      startDate: new Date(data.startDate).toISOString().slice(0, 10),
      endDate: new Date(data.endDate).toISOString().slice(0, 10)
    };
    if (formattedData.endDate < formattedData.startDate) {
      setDateError('End date cannot be earlier than start date.');
    } else {
      try {
        await editVacationService(vacationId, formattedData);
        navigate('/vacations');
      } catch (error) {
        console.error('Failed to add vacation', error);
      }
    }
  }

  return (
    <div>
      <h1>Edit Vacation</h1>
      {vacation ? 
        <FormProvider {...methods}>
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              Destination
              <input
                type="text"
                {...methods.register("destination")}
                defaultValue={vacation.destination}
              />
              {methods.formState.errors.destination && (
                <span className="error">{methods.formState.errors.destination.message}</span>
              )}
              Description of the vacation
              <input
                type="text"
                {...methods.register("description")}
                defaultValue={vacation.description}
              />
              {methods.formState.errors.description && (
                <span className="error">{methods.formState.errors.description.message}</span>
              )}
              Start Date
              <input
                type="date"
                {...methods.register("startDate")}
                defaultValue={vacation.startDate as any}
              />
              {methods.formState.errors.startDate && (
                <span className="error">{methods.formState.errors.startDate.message}</span>
              )}
              End Date
              <input
                type="date"
                {...methods.register("endDate")}
                defaultValue={vacation.endDate as any}
              />
              <span className="error">{dateError}</span>

              {methods.formState.errors.endDate && (
                <span className="error">{methods.formState.errors.endDate.message}</span>
              )}

              Price
              <input
                type="text"
                {...methods.register("price")}
                defaultValue={vacation.price}
              />
              {methods.formState.errors.price && (
                <span className="error">{methods.formState.errors.price.message}</span>
              )}
              Image
              <input
                type="text"
                {...methods.register("imageFileName")}
                defaultValue={vacation.imageFileName}
              />
              {methods.formState.errors.imageFileName && (
                <span>{methods.formState.errors.imageFileName.message}</span>
              )}
            </div>
            <button type="submit" >
              Update
            </button>
          </form>
        </FormProvider> 
       : <p>
        <Loader></Loader>
        </p>
      }
    </div>
  );
};

export default EditVacation;
