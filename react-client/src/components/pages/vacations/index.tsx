import { useEffect, useState } from "react";
import { IVacation, getAllVacationsService } from "./service";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { checkIsAdminJwt } from "../helper/decodeJWT";
import VacationCard from "./vacationCard";

export default function VacationsList() {
  const [vacations, setVacations] = useState<Array<IVacation>>([]);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isUserFollow, setIsUserFollow] = useState<boolean>(false)
  const [isNotStarted, setIsNotStarted] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)

  const vacationsPerPage = 10;

  async function getVacations(isUserFollow: boolean = false, isNotStarted: boolean = false, isActive: boolean = false) {
    try {
      const result = await getAllVacationsService(isUserFollow, isNotStarted, isActive)
      setVacations(result);
    }
    catch (error: any) {
      if (error.message == '401') {
        navigate('/login')
      }
      alert(error)
    }
  }

  async function initData() {
    await getVacations();
    await checkIsAdmin();
  }

  useEffect(() => {
    initData()
  }, []);

  function addVacation() {
    navigate("/addVacation")
  }

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

  // Function to handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  function checkIsAdmin() {
    setIsAdmin(checkIsAdminJwt())
  }

  const downloadAllVacationsCSV = () => {
    if (vacations.length === 0) {
      console.error('No data to export.');
      return;
    }
    const csvContentArray = vacations.map((vacation) => {
      return `${vacation.destination},${vacation.followers}`;
    });

    // הפוך את המערך למחרוזת אחת גדולה על ידי הפרדה באמצעות רגלין חדלניות
    const csvContent = `Destination,Followers\n${csvContentArray.join('\n')}`;

    // יצירת אובייקט Blob עם הנתונים של ה-CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // יצירת URL עבור ה-Blob
    const url = window.URL.createObjectURL(blob);

    // יצירת אלמנט לינק שיגרום להורדת הקובץ
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all_vacations.csv'; // שינוי השם של הקובץ אם רצוי
    a.click();

    // השחרור של ה-URL
    window.URL.revokeObjectURL(url);
  };



  return (
    <div>
      <br />
      <div className="form-check" >
        <label className="form-check-label" htmlFor="isUserFollow" >
          <input className="form-check-input" type="checkbox" value="" id="isUserFollow"
            checked={isUserFollow} onChange={() => {
              setIsUserFollow(!isUserFollow);
              getVacations(!isUserFollow, isNotStarted, isActive)
            }} />
          is user follow
        </label>
        <label className="form-check-label" htmlFor="isNotStarted">
          <input className="form-check-input" type="checkbox" value="" id="isNotStarted"
            checked={isNotStarted} onChange={() => { setIsNotStarted(!isNotStarted); getVacations(isUserFollow, !isNotStarted, isActive) }} />
          is vacation started
        </label>
        <label className="form-check-label" htmlFor="isActive">
          <input className="form-check-input" type="checkbox" value="" id="isActive"
            checked={isActive} onChange={() => { setIsActive(!isActive); getVacations(isUserFollow, isNotStarted, !isActive) }} />
          is vacation active
        </label>
      </div>
      <br />
      {isAdmin && <button type="button" onClick={addVacation}>

        Add Vacation
      </button>}

      {isAdmin && (
        <div>
          <button style={{ marginRight: "800px" }} type="button" onClick={downloadAllVacationsCSV}>
            Download All Vacations CSV
          </button>
        </div>
      )}
      {/* TODO IN VACATION CARD */}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {currentVacations.map((vacation) => (
          <div key={vacation.vacationId}>
            <VacationCard
              key={vacation.vacationId}
              vacation={vacation}
              loadVacations={getVacations}
              isAdmin={isAdmin!}
            />
          </div>
        ))}
      </div>
      <Pagination
        count={Math.ceil(vacations.length / vacationsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
