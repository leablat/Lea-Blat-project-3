import { useEffect, useState } from "react";
import { IVacation } from "../service";
import { useNavigate } from "react-router-dom";
import { deleteVacationService } from "./vacationCardService";
import { addFollowerService, deleteFollowerService, getFollowerService } from "./followerServise";
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface VacationCardProps {
  isAdmin: Boolean
  vacation: IVacation;
  loadVacations: () => void;
}

function formatDate(dateString: any) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

const VacationCard = ({ vacation, loadVacations, isAdmin }: VacationCardProps) => {
  const navigate = useNavigate();
  const vacationId = vacation.vacationId;
  const [isFollower, setIsFollower] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    getFollower()
  }, []);

  async function getFollower() {
    try {
      const result: any = await getFollowerService(vacationId);
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
    try {
      if (isFollower) {
        await deleteFollowerService(vacationId);
        vacation.followers = vacation.followers - 1
      }
      else {
        await addFollowerService(vacationId);
        vacation.followers = vacation.followers + 1
      }
      getFollower();
    } catch (e: any) {
      setErrorMessage(e.response.data)
    }
  }

  function MoreDetails() {
    navigate(`/vacationDetails/${vacationId}`);
  }

  return (
    <div className={styles['card-container']}>
      <span className="error">{errorMessage}</span>
      <div className={`p-card ${styles['p-card']}`}>
        <div className={`${styles['image-container']}`}>
          <div>
            <div className={`${styles['icons']}`}>
              {isAdmin && <button className={`edit-button ${styles['edit-button']}`} type="button" onClick={editVacation}>
                <FontAwesomeIcon icon={faEdit} />
              </button>}
              {isAdmin && <button className={`delete-button ${styles['delete-button']}`}
                type="button" onClick={DeleteVacation}>
                <FontAwesomeIcon icon={faTrash} />
              </button>}
              {!isAdmin &&
                <button className={isFollower ? `active` : `not-active`}
                  type="button" onClick={like}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span> {vacation.followers}</span>
                </button>}
            </div>
            <img
              alt="Vacation"
              src={vacation.imageFileName}
              className={`vacation-image ${styles['vacation-image']}`}
            />
            <div style={{ padding: "16px", textAlign: "center" }}>
              <div className={`date-range ${styles['date-range']}`}>
                <h5>
                  {formatDate(vacation.startDate)}
                  -
                  {formatDate(vacation.endDate)}
                </h5>
              </div>
              <h2>{vacation.destination}</h2>
              <p>{vacation.description}</p>
              <p>Price: {vacation.price}$</p>

              <button type="button" onClick={MoreDetails}>
                More details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationCard;
