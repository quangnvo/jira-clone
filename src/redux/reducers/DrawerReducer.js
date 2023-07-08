import {
    ADD_HANDLE_SUBMIT_FUNCTION,
    CLOSE_DRAWER,
    OPEN_DRAWER_WITH_FORM_CREATE_TASK,
    OPEN_DRAWER_WITH_FORM_EDIT_PROJECT,
    OPEN_DRAWER_WITH_FORM_EDIT_USER
} from "../constants/constants"


const initialState = {
    isDrawerVisible: false,
    ComponentContentDrawer: <p>default content</p>,

    // Chức năng nút Edit User
    userInfoEdit: {
        userId: 0,
        email: "",
        name: "",
        phoneNumber: ""
    },

    // Chức năng nút Edit Project
    projectInfoEdit: {
        id: 0,
        projectName: "",
        creator: 0,
        description: "",
        categoryId: ""
    },

    // Chức năng nút Create Task
    createdTask: {
        listUserAsign: [],
        taskName: "",
        description: "",
        statusId: "",
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: 0,
        typeId: 0,
        priorityId: 0
    },

    handleSubmitFunction: () => { }
}



export const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HANDLE_SUBMIT_FUNCTION: {
            return {
                ...state,
                handleSubmitFunction: action.handleSubmitFunction
            }
        }

        case CLOSE_DRAWER: {
            return { ...state, isDrawerVisible: false }
        }

        case OPEN_DRAWER_WITH_FORM_EDIT_PROJECT: {
            return {
                ...state,
                isDrawerVisible: true,
                projectInfoEdit: action.projectInfoEdit,
                ComponentContentDrawer: action.ComponentContentDrawer,
            }
        }

        case OPEN_DRAWER_WITH_FORM_EDIT_USER: {
            return {
                ...state,
                isDrawerVisible: true,
                ComponentContentDrawer: action.ComponentContentDrawer,
                userInfoEdit: action.userInfoEdit
            }
        }

        case OPEN_DRAWER_WITH_FORM_CREATE_TASK: {
            return {
                ...state,
                isDrawerVisible: true,
                ComponentContentDrawer: action.ComponentContentDrawer,
                createdTask: action.createdTask
            }
        }


        default:
            return state
    }
}
