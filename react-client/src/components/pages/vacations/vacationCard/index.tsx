import React, { useEffect, useState } from "react";
import { IVacation } from "../service";
import { useNavigate } from "react-router-dom";
import { deleteVacationService } from "./service";
import { addFollowerService, deleteFollowerService, getFollowerService } from "./followerServise";

interface VacationCardProps {
  isAdmin: Boolean
  vacation: IVacation;
  loadVacations: () => void;
}

const VacationCard = ({ vacation, loadVacations, isAdmin }: VacationCardProps) => {
  const navigate = useNavigate();
  const vacationId = vacation.vacationId;
  const [isFollower, setIsFollower] = useState<boolean>(false)
  console.log("vacationId", vacationId);

  useEffect(() => {
    getFollower()
  }, []);

  async function getFollower() {
    try {


      const result: any = await getFollowerService(vacationId);
      console.log("result", result);

      if (Object.keys(result).length === 0) {
        setIsFollower(false)
      }
      else {
        setIsFollower(true)

      }




    } catch (error: any) {
      if (error.message) {

      }
    }

  }

  function editVacation() {
    if (vacationId) {
      navigate(`/editVacation/${vacationId}`);
      console.log("editVacation", vacationId);
    } else {
      console.error("Invalid vacationId:", vacationId);
    }
  }

  async function DeleteVacation() {
    if (vacationId) {
      await deleteVacationService(vacationId);
      loadVacations();
    } else {
      console.error("Invalid vacationId:", vacationId);
    }
  }

  async function like() {
    if (isFollower) {
      await deleteFollowerService(vacationId);
    }
    else{
      await addFollowerService(vacationId);
    }
    getFollower();
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
          {isAdmin && <button type="button" onClick={editVacation}>
            Edit
          </button>}
          {isAdmin && <button type="button" onClick={DeleteVacation}>
            Delete
          </button>}
          {!isAdmin && <button type="button" onClick={like} className={isFollower? 'active':'not-active'}>

            LIKE{vacation.followers}
          </button>}
        </div>
        <img
          src={vacation.imageFileName}
          style={{ width: "100%", marginBottom: "8px" }}
          alt={`Vacation to ${vacation.destination}`}
        />
        <h2>{vacation.destination}</h2>
        <p>{vacation.description}</p>
        <p>Price: {vacation.price}</p>
      </div>

    </div>


  );
};

export default VacationCard;
