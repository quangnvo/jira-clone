import { baseService } from "./baseService";

export class TaskService extends baseService {
    getTaskDetail = (taskId) => {
        return this.get(`api/Project/getTaskDetail?taskId=${taskId}`)
    }

    updateTask = (updatedTask) => {
        return this.post(`api/Project/updateTask`, updatedTask)
    }

    insertComment = (commentOfUser) => {
        return this.post(`api/Comment/insertComment`, commentOfUser)
    }

    deleteComment = (idComment) => {
        return this.delete(`api/Comment/deleteComment?idComment=${idComment}`)
    }

    updateComment = (commentObject) => {
        return this.put(`api/Comment/updateComment?id=${commentObject.id}&contentComment=${commentObject.contentComment}`)
    }

}

export const taskService = new TaskService();




