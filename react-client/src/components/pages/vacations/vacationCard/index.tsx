import { IVacation } from "../service"; // Make sure the correct path is used
import { useNavigate } from "react-router-dom";
import { deleteVacationService } from "./service";

interface VacationCardProps {
  vacation: IVacation;
  loadVacations:any
}

const VacationCard = ({ vacation,loadVacations }: VacationCardProps) => {

  const navigate = useNavigate();

  function editVacation() {
    navigate(`/editVacation/${vacation.vacationId}`)
  }

 async function DeleteVacation() {
    await deleteVacationService(vacation.vacationId);
    loadVacations()
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          margin: "16px",
          width: "300px",
        }}
      >
        <div>
          <button type="button" onClick={editVacation}>
            Edit
          </button>
          <button type="button" onClick={DeleteVacation}>
            Delete
          </button>
        </div>
        <img
          src={vacation.imageFileName}
          style={{ width: "100%", marginBottom: "8px" }}
        />
        <h2>{vacation.destination}</h2>
        <p>Price: {vacation.price}</p>
      </div>
    </div>
  );
};

export default VacationCard;
