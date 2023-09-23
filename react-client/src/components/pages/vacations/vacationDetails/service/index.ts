import axios from "axios";
import axiosConfig from "../../../helper/httpConfig";
import { IComment } from "..";
async function getVacationDetailsService(vacationId:any) {
  try {
    console.log(axiosConfig);
    
    // const url = `${axiosConfig.baseUrl}/vacations/${vacationId}`;
    const { data } = await axios.get(`${axiosConfig.baseUrl}/vacations/details/${vacationId}`, axiosConfig.options);

    if (!data) {
      throw new Error(`Vacation with ID ${vacationId} not found`);
    }

    const vacation = {
      vacationId: data.vacationId,
      destination: data.destination,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      price: data.price,
      imageFileName: data.imageFileName,
    };

    return vacation;
  } catch (error) {
    throw error;
  }
}

async function addCommentService(comment: string, vacationId: number) {


console.log("addCommentService", comment );

  try {
    await axios.post(`${axiosConfig.baseUrl}/comments/${vacationId}`, { comment }, axiosConfig.options)
      .then((response) => {
   

        console.log(response);

      })
      .catch((error) => {
        if (error.response.status == 401) {
          // navigate("/login")

          throw Error("401");
        }
        throw Error("error");
      })

  } catch (error) {
    console.log(`Error add comment failed`);
    throw error;
  }
}


async function getCommentsService(vacationId: any) {
  try {
    return await axios.get(`${axiosConfig.baseUrl}/comments/${vacationId}`, axiosConfig.options)
      .then((res) => {
        const comments: Array<IComment> = res.data.map((c: IComment) => {
          return {
            commentId: c.commentId,
            userName: c.userName,
            comment: c.comment
          }
        }

        )
        return comments;
      })
      .catch((err) => {
        console.log("get all comments failed", err);
      });
  } catch (error) {
    throw error;
  }
}

export { addCommentService, getCommentsService, getVacationDetailsService };
