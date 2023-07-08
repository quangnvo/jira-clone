import { baseService } from "./baseService"

export class UserService extends baseService {
    signupUser = (newUser) => {
        return this.post(`api/Users/signup`, newUser)
    }

    signinUser = (user) => {
        return this.post(`api/Users/signin`, user)
    }

    getAllUser = () => {
        return this.get(`api/Users/getUser`)
    }

    getAllUserWithKeyWord = (keyword) => {
        return this.get(`api/Users/getUser?keyword=${keyword}`)
    }

    deleteUser = (userId) => {
        return this.delete(`api/Users/deleteUser?id=${userId}`)
    }

    editUser = (editedUser) => {
        return this.put(`api/Users/editUser`, editedUser)
    }

    assignUserToProject = (projectAndUserId) => {
        return this.post(`api/Project/assignUserProject`, projectAndUserId)
    }

    removeUserFromProject = (projectAndUserId) => {
        return this.post(`api/Project/removeUserFromProject`, projectAndUserId)
    }

}

export const userService = new UserService();





