import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { TypeOf, date, object, string } from "zod";
import { editVacationService, getVacationService } from "./service";
import { useNavigate, useParams } from "react-router-dom";

const editVacationSchema = object({
  destination: string(),
  description: string(),
  startDate: date(),
  endDate: date(),
  price: string(),
  imageFileName: string(),
});

type editVacationInput = TypeOf<typeof editVacationSchema>;

const EditVacation = () => {
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

  const updateVacation = async () => {
    try {
      const updatedVacation = {
        destination: methods.getValues("destination"),
        description: methods.getValues("description"),
        startDate: methods.getValues("startDate"),
        endDate: methods.getValues("endDate"),
        price: methods.getValues("price"),
        imageFileName: methods.getValues("imageFileName"),
      };

      // Call your service to update the vacation
      const result = await editVacationService(vacationId, updatedVacation);

      console.log("update result", result);
      navigate("/vacations");
    } catch (error) {
      console.error("Error updating vacation:", error);
    }
  };

  return (
    <div>
      <h1>Edit Vacation</h1>
      {vacation ? (
        <FormProvider {...methods}>
          <form id="form">
            <div style={{ display: "flex", flexDirection: "column" }}>
              Destination
              <input
                type="text"
                {...methods.register("destination")}
                defaultValue={vacation.destination}
              />
              {methods.formState.errors.destination && (
                <span>{methods.formState.errors.destination.message}</span>
              )}
              Description of the vacation
              <input
                type="text"
                {...methods.register("description")}
                defaultValue={vacation.description}
              />
              {methods.formState.errors.description && (
                <span>{methods.formState.errors.description.message}</span>
              )}
              Start Date
              <input
                type="date"
                {...methods.register("startDate")}
                defaultValue={vacation.startDate as any} 
              />
              {methods.formState.errors.startDate && (
                <span>{methods.formState.errors.startDate.message}</span>
              )}
              End Date
              <input
                type="date"
                {...methods.register("endDate")}
                defaultValue={vacation.endDate as any} 
              />
              {methods.formState.errors.endDate && (
                <span>{methods.formState.errors.endDate.message}</span>
              )}

              Price
              <input
                type="text"
                {...methods.register("price")}
                defaultValue={vacation.price}
              />
              {methods.formState.errors.price && (
                <span>{methods.formState.errors.price.message}</span>
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
            <button type="button" onClick={updateVacation}>
              Update
            </button>
          </form>
        </FormProvider>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditVacation;
