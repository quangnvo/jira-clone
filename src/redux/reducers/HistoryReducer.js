import { ADD_HISTORY } from "../constants/constants"

const initialState = {
    history: {}
}

export const HistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HISTORY: {
            return { ...state, history: action.history }
        }

        default:
            return state
    }
}
