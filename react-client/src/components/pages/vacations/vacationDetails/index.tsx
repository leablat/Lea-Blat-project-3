import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCommentService, getCommentsService, getVacationDetailsService } from "./service";
import { Loader } from "../../../ui-components/loader";

export interface IComment {
  commentId: number,
  userName: string,
  comment: string,
}
const VacationDetails = () => {
  const [vacation, setVacation] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const { vacationId } = useParams();
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchData();
    getComments();
  }, [vacationId]);

  async function getComments() {
    try {
      const result: any = await getCommentsService(vacationId)
      setComments(result)
    }
    catch (error) {
      alert("error" + error);
    }
  }
  async function fetchData() {
    try {
      const vacationData = await getVacationDetailsService(vacationId);
      // Convert Date objects to string for default values
      vacationData.startDate = new Date(vacationData.startDate).toISOString().split("T")[0];
      vacationData.endDate = new Date(vacationData.endDate).toISOString().split("T")[0];
      setVacation(vacationData);
    } catch (error) {
      console.log("Error fetching vacation data:", error);
    }
  }
  function handleCommentChange(event: any) {
    setComment(event.target.value);
  };

  async function addComment() {
    try {
      await addCommentService(comment, vacation.vacationId)
      getComments();
      setComment("");
    }
    catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      {vacation ?
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              margin: "16px",
              width: "60%",
            }}
          >
            <img
              src={vacation.imageFileName}
              style={{ width: "100%", marginBottom: "8px" }}
              alt={`Vacation to ${vacation.destination}`}
            />
            <h2>{vacation.destination}</h2>
            <p>{vacation.description}</p>
            <p>Price: {vacation.price}</p>

            <div>
              {comments.map((comment, index) => (
                <div className="comment-item" key={index}>
                  <div className="userName">{comment.userName}</div>
                  <div className="comment">{comment.comment}</div>
                </div>
              ))}

              <div>
                <label htmlFor="message">My Textarea</label>
                <textarea
                  id="message"
                  name="message"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <hr />
                <button disabled={!comment} onClick={addComment}>add comment</button>
              </div>
            </div>
          </div>

        </div>
        : <Loader></Loader>}
    </div>
  );
};

export default VacationDetails;
