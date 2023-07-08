import { baseService } from "./baseService"

export class ProjectService extends baseService {
    getAllProject = () => {
        return this.get(`api/Project/getAllProject`)
    }

    getProjectWithKeyword = (keyword) => {
        if (!keyword) {
            return this.get(`api/Project/getAllProject`)
        }
        return this.get(`api/Project/getAllProject?keyword=${keyword}`)
    }

    getProjectCategory = () => {
        return this.get(`api/ProjectCategory`)
    }

    createProject = (newProject) => {
        return this.post(`api/Project/createProjectAuthorize`, newProject)
    }

    deleteProject = (projectId) => {
        return this.delete(`api/Project/deleteProject?projectId=${projectId}`)
    }

    editProject = (projectId, editedProject) => {
        return this.put(`api/Project/updateProject?projectId=${projectId}`, editedProject)
    }

    getProjectDetail = (projectId) => {
        return this.get(`api/Project/getProjectDetail?id=${projectId}`)
    }

    getAllTaskType = () => {
        return this.get(`api/TaskType/getAll`)
    }

    getAllPriority = () => {
        return this.get(`api/Priority/getAll?id=0`)
    }

    getAllProjectForDropdown = () => {
        return this.get(`api/Project/getAllProject`)
    }

    getAllUserForDropdown = () => {
        return this.get(`api/Users/getUser`)
    }

    createTask = (newTask) => {
        return this.post(`api/Project/createTask`, newTask)
    }

    getAllStatus = () => {
        return this.get(`api/Status/getAll`)
    }

    getUserByProjectId = (projectId) => {
        return this.get(`api/Users/getUserByProjectId?idProject=${projectId}`)
    }

    deleteTask = (taskId)=>{
        return this.delete(`api/Project/removeTask?taskId=${taskId}`)
    }
}

export const projectService = new ProjectService();




