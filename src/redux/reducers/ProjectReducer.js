import {
    GET_ALL_PRIORITY,
    GET_ALL_PROJECT,
    GET_ALL_PROJECT_CHO_DROPDOWN,
    GET_ALL_STATUS,
    GET_ALL_TASK_TYPE,
    GET_ALL_USER_CHO_DROPDOWN,
    GET_PROJECT_CATEGORY,
    GET_PROJECT_DETAIL,
    GET_PROJECT_DETAIL_FOR_CREATE_TASK
} from "../constants/constants"

const initialState = {
    allProject: [],

    projectCategory: [],

    projectDetail: {
        lstTask: [
            {
                lstTaskDeTail: [],
                statusId: "1",
                statusName: "BACKLOG",
                alias: "tồn đọng"
            },
            {
                lstTaskDeTail: [],
                statusId: "2",
                statusName: "SELECTED FOR DEVELOPMENT",
                alias: "được chọn để phát triển"
            },
            {
                lstTaskDeTail: [],
                statusId: "3",
                statusName: "IN PROGRESS",
                alias: "trong tiến trình"
            },
            {
                lstTaskDeTail: [],
                statusId: "4",
                statusName: "DONE",
                alias: "hoàn thành"
            }
        ],
        members: [
            {
                userId: 3602,
                name: "Nguyen Quang Xuan",
                avatar: "https://ui-avatars.com/api/?name=Nguyen Quang Xuan",
                email: null,
                phoneNumber: null
            }
        ],
        creator: {
            id: 3623,
            name: "Nguyen Van A"
        },
        id: 9966,
        projectName: "123",
        description: "<p>Mo ta</p>",
        projectCategory: {
            id: 1,
            name: "Dự án web"
        },
        alias: "test-tran-xuan-danh"
    },

    arrAllProjectDungDeDropDown: [],
    arrTaskType: [],
    arrPriority: [],
    arrAllUserDungDeDropDown: [],
    arrStatus: [],

    projectDetailOnlyForCreateTask: {
        lstTask: [
            {
                lstTaskDeTail: [],
                statusId: "1",
                statusName: "BACKLOG",
                alias: "tồn đọng"
            },
            {
                lstTaskDeTail: [],
                statusId: "2",
                statusName: "SELECTED FOR DEVELOPMENT",
                alias: "được chọn để phát triển"
            },
            {
                lstTaskDeTail: [],
                statusId: "3",
                statusName: "IN PROGRESS",
                alias: "trong tiến trình"
            },
            {
                lstTaskDeTail: [],
                statusId: "4",
                statusName: "DONE",
                alias: "hoàn thành"
            }
        ],
        members: [
            {
                userId: 3602,
                name: "Nguyen Quang Xuan",
                avatar: "https://ui-avatars.com/api/?name=Nguyen Quang Xuan",
                email: null,
                phoneNumber: null
            }
        ],
        creator: {
            id: 3623,
            name: "....."
        },
        id: 0,
        projectName: "123",
        description: "<p>Mo ta</p>",
        projectCategory: {
            id: 1,
            name: "Dự án web"
        },
        alias: "test-tran-xuan-danh"
    },
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PROJECT: {
            return { ...state, allProject: action.allProject }
        }

        case GET_PROJECT_CATEGORY: {
            return { ...state, projectCategory: action.projectCategory }
        }

        case GET_PROJECT_DETAIL: {
            return { ...state, projectDetail: action.projectDetail }
        }

        case GET_ALL_PROJECT_CHO_DROPDOWN: {
            return { ...state, arrAllProjectDungDeDropDown: action.arrAllProjectDungDeDropDown }
        }

        case GET_ALL_TASK_TYPE: {
            return { ...state, arrTaskType: action.arrTaskType }
        }

        case GET_ALL_PRIORITY: {
            return { ...state, arrPriority: action.arrPriority }
        }

        case GET_ALL_USER_CHO_DROPDOWN: {
            return { ...state, arrAllUserDungDeDropDown: action.arrAllUserDungDeDropDown }
        }

        case GET_ALL_STATUS: {
            return { ...state, arrStatus: action.arrStatus }
        }

        case GET_PROJECT_DETAIL_FOR_CREATE_TASK: {
            return { ...state, projectDetailOnlyForCreateTask: action.projectDetailOnlyForCreateTask }
        }

        default:
            return state
    }
}
