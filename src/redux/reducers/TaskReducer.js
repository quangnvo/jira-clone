import { CHANGE_ISVISIBLE_TASK_EDITOR, GET_TASK_DETAIL, GHI_NHO_COMMENT_ID_KHI_NHAP_EDIT_COMMENT, REMOVE_ASSIGNEE_IN_TASK_MODAL, UPDATE_ASSIGNEE_IN_TASK_MODAL, UPDATE_TASK_MODAL } from "../constants/constants"

const initialState = {
    taskDetailModal: {
        priorityTask: {
            priorityId: 1,
            priority: "High"
        },
        taskTypeDetail: {
            id: 1,
            taskType: "bug"
        },
        assigness: [{
            avatar: "https://ui-avatars.com/api/?name=Bui Vinh Nam",
            email: null,
            id: 2537,
            name: "Bui Vinh Nam",
            phoneNumber: null,
        }],
        lstComment: [],
        taskId: 7589,
        taskName: "test thử dota",
        alias: "test-thu-dota",
        description: "",
        statusId: "1",
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        typeId: 1,
        priorityId: 1,
        projectId: 9992
    },
    commentIdTuReducer: -1
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModal: action.taskDetailModal }
        }

        case UPDATE_TASK_MODAL: {
            return {
                ...state,
                taskDetailModal: {
                    ...state.taskDetailModal,
                    [action.name]: action.value
                }
            }
        }

        case UPDATE_ASSIGNEE_IN_TASK_MODAL: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.selectedUser]
            return { ...state }
        }

        case REMOVE_ASSIGNEE_IN_TASK_MODAL: {
            let arrAssigneesAfterRemoveAssignee = state.taskDetailModal.assigness.filter(user => user.id !== action.userId)

            return {
                ...state,
                taskDetailModal: {
                    ...state.taskDetailModal,
                    assigness: arrAssigneesAfterRemoveAssignee
                }
            }
        }

        case GHI_NHO_COMMENT_ID_KHI_NHAP_EDIT_COMMENT: {
            return { ...state, commentIdTuReducer: action.commentID }
        }


        default:
            return state
    }
}
