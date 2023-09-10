import { useEffect, useState } from "react";
import { IVacation, getAllVacationsService } from "./service";
import VacationCard from "./vacationCard";
import { useNavigate } from "react-router-dom";
import checkIsAdminJwt from "../../pages/helper/decodeJWT"

export default function VacationsList() {
  const [vacations, setVacations] = useState<Array<IVacation>>([]);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  async function getVacations() {
    try {

      const result = await getAllVacationsService();

      setVacations(result);
    } catch (error: any) {
      if (error.message) {
        navigate('/login')
      }
    }
  }



  useEffect(() => {
    getVacations();
    checkIsAdmin();
  }, []);

  function addVacation() {
    navigate("/addVacation")
  }


  function checkIsAdmin() {
    setIsAdmin(checkIsAdminJwt())
  }
  return (
    <div>
      {isAdmin && <button type="button" onClick={addVacation}>

        Add Vacation
      </button>}
      {/* TODO IN VACATION CARD */}
     
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {vacations.map((vacation) => (
  <div key={vacation.vacationId}>
    <VacationCard
      key={vacation.vacationId}
      vacation={vacation}
      loadVacations={getVacations}
      isAdmin={isAdmin} // Pass isAdmin to each VacationCard
    />
  </div>
))}

      </div>

    </div>
  );
}
