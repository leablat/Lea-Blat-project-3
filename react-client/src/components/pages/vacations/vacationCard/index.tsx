import { useEffect, useState } from "react";
import { IVacation } from "../service";
import { useNavigate } from "react-router-dom";
import { deleteVacationService } from "./deleteService";
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
  return date.toLocaleDateString('en-GB', options);
}

const VacationCard = ({ vacation, loadVacations, isAdmin }: VacationCardProps) => {
  const navigate = useNavigate();
  const vacationId = vacation.vacationId;
  const [isFollower, setIsFollower] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


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
    try {
      if (vacationId) {
        if (showDeleteConfirmation) {
          await deleteVacationService(vacationId);
          loadVacations();
          setShowDeleteConfirmation(false);
        } else {
          setShowDeleteConfirmation(true);
        }
      } else {
        console.error("Invalid vacationId:", vacationId);
      }
    } catch (error: any) {
      if (error.message == '401') {
        navigate('/login')
      }
      alert(error)
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
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this vacation?</p>
          <button onClick={DeleteVacation}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}
      <span className="error">{errorMessage}</span>
      <div className={`p-card ${styles['p-card']}`}>
        <div className="image-section" style={{ height: "150px", width: "100%" }}>
          <img
            className="image"
            alt="Vacation"
            src={vacation.imageFileName}></img>
          <div className={`${styles['icons']}`}>
            <div className={`destination ${styles['destination']}`}>
              <h2> {vacation.destination}</h2>
            </div>
            {isAdmin &&
              <div className="btn-container">
                <button className={`edit-button ${styles['edit-button']}`} type="button" onClick={editVacation}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className={`delete-button ${styles['delete-button']}`}
                  type="button" onClick={DeleteVacation}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>}
            {!isAdmin &&
              <div className="btn-container">
                <button className={isFollower ? `active` : `not-active`}
                  type="button" onClick={like}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span> {vacation.followers}</span>
                </button>
              </div>}
          </div>
        </div>
        <div className="details-section" style={{
          height: "300px", width: "100%", borderRadius: "4px",
        }}>
          <div><div className={`date-range ${styles['date-range']}`}>
            <h5>
              {formatDate(vacation.startDate)}
              -
              {formatDate(vacation.endDate)}
            </h5>
          </div>
            <div className={`description ${styles['description']}`}>
              <p >Description:{vacation.description}</p>
            </div>
          </div>
          <div className="footer">
            <div className={`price ${styles['price']}`}>
              <h6> ${vacation.price}</h6>
            </div>
            <button className="more-details-btn" type="button" onClick={MoreDetails}>
              More details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationCard;
