import { SIGN_IN_SAGA, SIGN_UP_SAGA } from "../constants/constants"

export const jiraAction = {
    signinAction: (user) => ({
        type: SIGN_IN_SAGA,
        user
    }),

    signupAction: (newUser) => ({
        type: SIGN_UP_SAGA,
        newUser
    })
}

