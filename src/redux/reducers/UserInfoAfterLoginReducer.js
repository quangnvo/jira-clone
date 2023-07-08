import { SHOW_USER_LOGIN_INFO, USER_LOGIN, USLOGIN } from "../constants/constants"

let userInfoAfterLogin = []

if (localStorage.getItem(USER_LOGIN)) {
    userInfoAfterLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLoginInfo: userInfoAfterLogin
}



export const UserInfoAfterLoginReducer = (state = initialState, action) => {
    switch (action.type) {

        case SHOW_USER_LOGIN_INFO: {
            let userInfoAfterLogin = []

            if (localStorage.getItem(USER_LOGIN)) {
                userInfoAfterLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
            }
            return { ...state, userLoginInfo: userInfoAfterLogin }
        }

        case USLOGIN: {
            return { ...state, userLoginInfo: action.userLoginInfo }
        }

        default:
            return state
    }
}
