import axios from "axios";
import { IComment } from "..";
import { axiosConfig } from "../../../helper/httpConfig";
async function getVacationDetailsService(vacationId: any) {
  try {
    const { data } = await axios.get(`${axiosConfig().baseUrl}/vacations/details/${vacationId}`, axiosConfig().options);
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
  try {
    await axios.post(`${axiosConfig().baseUrl}/comments/${vacationId}`, { comment }, axiosConfig().options)
  } catch (error) {
    throw error;
  }
}

async function getCommentsService(vacationId: any) {
  try {
    const { data } = await axios.get(`${axiosConfig().baseUrl}/comments/${vacationId}`, axiosConfig().options)
    const comments: Array<IComment> = data.map((c: IComment) => {
      return {
        commentId: c.commentId,
        userName: c.userName,
        comment: c.comment
      }
    })
    return comments;
  } catch (error) {
    throw error;
  }
}

export { addCommentService, getCommentsService, getVacationDetailsService };
