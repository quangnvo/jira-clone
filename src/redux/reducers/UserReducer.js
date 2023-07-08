import { GET_USER, GET_USER_FOR_AUTOCOMPLETE } from "../constants/constants"

const initialState = {
    allUser: [],
    userSearchAutocomplete: [],
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER: {
            return { ...state, allUser: action.allUser }
        }

        case GET_USER_FOR_AUTOCOMPLETE: {
            return { ...state, userSearchAutocomplete: action.userSearchAutocomplete }
        }

        default:
            return state
    }
}
