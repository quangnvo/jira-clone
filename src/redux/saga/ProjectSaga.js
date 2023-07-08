import { call, delay, put, select, takeLatest } from 'redux-saga/effects'

// --------- Import constant ---------
import {
    CLOSE_DRAWER,
    CREATE_PROJECT_SAGA,
    CREATE_TASK_SAGA,
    DELETE_PROJECT_SAGA,
    DELETE_TASK_SAGA,
    DISPLAY_LOADING,
    EDIT_PROJECT_SAGA,
    GET_ALL_PRIORITY,
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_PROJECT,
    GET_ALL_PROJECT_CHO_DROPDOWN,
    GET_ALL_PROJECT_CHO_DROPDOWN_SAGA,
    GET_ALL_PROJECT_SAGA,
    GET_ALL_STATUS,
    GET_ALL_STATUS_SAGA,
    GET_ALL_TASK_TYPE,
    GET_ALL_TASK_TYPE_SAGA,
    GET_ALL_USER_CHO_DROPDOWN,
    GET_ALL_USER_CHO_DROPDOWN_SAGA,
    GET_PROJECT_CATEGORY,
    GET_PROJECT_CATEGORY_SAGA,
    GET_PROJECT_DETAIL,
    GET_PROJECT_DETAIL_FOR_CREATE_TASK,
    GET_PROJECT_DETAIL_FOR_CREATE_TASK_SAGA,
    GET_PROJECT_DETAIL_SAGA,
    GET_PROJECT_WITH_KEYWORD,
    HIDE_LOADING,
    STATUS_CODE,
} from '../constants/constants';

// --------- Import other libraries ---------
import Swal from 'sweetalert2'
import { projectService } from '../../services/ProjectService';


// --------- Notification template for Sweet Alert ---------
const thongBaoSweetAlert = (title, icon, text = '') => {
    return Swal.fire({
        title: title,
        icon: icon,
        text: text,
        confirmButtonText: 'Close'
    })
}


// ----------------- Get All Project -----------------
function* getAllProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllProject())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT,
                allProject: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}


// ----------------- Get All Project With Keyword-----------------
function* getAllProjectWithKeyword(action) {
    try {
        const { data, status } = yield call(() => projectService.getProjectWithKeyword(action.keyword))

        if (status === STATUS_CODE.SUCCESS) {

            yield put({ type: DISPLAY_LOADING })
            yield delay(1200)
            yield put({ type: HIDE_LOADING })

            yield put({
                type: GET_ALL_PROJECT,
                allProject: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetAllProjectWithKeywordSaga() {
    yield takeLatest(GET_PROJECT_WITH_KEYWORD, getAllProjectWithKeyword)
}



// ----------------- Get Project Category -----------------
function* getProjectCategorySaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getProjectCategory())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_CATEGORY,
                projectCategory: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetProjectCategorySaga() {
    yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySaga)
}



// ----------------- Create Project -----------------
function* createProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.createProject(action.newProject))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert('Create project successfully !', 'success')
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Create project unsuccessfully !',
            'error',
            `${error.response.data.content}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}



// ----------------- Delete Project -----------------
function* deleteProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.deleteProject(action.projectId))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert('Delete project successfully !', 'success')
            yield put({ type: GET_ALL_PROJECT_SAGA })
        }

    } catch (error) {
        yield thongBaoSweetAlert('Delete project unsuccessfully !', 'error')
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}



// ----------------- Edit Project -----------------
function* editProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.editProject(action.editedProject.id, action.editedProject))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type: CLOSE_DRAWER })
            yield thongBaoSweetAlert('Edit project successfully !', 'success')

            yield put({ type: DISPLAY_LOADING })
            yield delay(1000)
            yield put({ type: HIDE_LOADING })

            yield put({ type: GET_ALL_PROJECT_SAGA })
        }

    } catch (error) {
        yield thongBaoSweetAlert('Edit project unsuccessfully !', 'error')
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiEditProjectSaga() {
    yield takeLatest(EDIT_PROJECT_SAGA, editProjectSaga)
}


// ----------------- Get Project Detail-----------------
function* getProjectDetailSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL,
                projectDetail: data.content
            })
        }

    } catch (error) {
        let history = yield select(state => state.HistoryReducer.history)
        history.push('/projectmanagement')

        yield thongBaoSweetAlert(
            'Showing project detail unsuccessfully !',
            'error',
            `${error.response.data.content}`
        )

        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga)
}



// ----------------- Get All Task Type -----------------
function* getAllTaskTypeSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllTaskType())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_TYPE,
                arrTaskType: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga)
}



// ----------------- Get All Priority -----------------
function* getAllPrioritySaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllPriority())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PRIORITY,
                arrPriority: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga)
}


// ----------------- Get All Project For Dropdown -----------------
function* getAllProjectForDropdownSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllProjectForDropdown())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CHO_DROPDOWN,
                arrAllProjectDungDeDropDown: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetAllProjectForDropdownSaga() {
    yield takeLatest(GET_ALL_PROJECT_CHO_DROPDOWN_SAGA, getAllProjectForDropdownSaga)
}



// ----------------- Get All User For Dropdown (By Project ID) -----------------
function* getAllUserForDropdown(action) {
    try {
        const { data, status } = yield call(() => projectService.getUserByProjectId(action.projectId))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER_CHO_DROPDOWN,
                arrAllUserDungDeDropDown: data.content
            })
        }

    } catch (error) {
        yield put({
            type: GET_ALL_USER_CHO_DROPDOWN,
            arrAllUserDungDeDropDown: []
        })
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetAllUserForDropdown() {
    yield takeLatest(GET_ALL_USER_CHO_DROPDOWN_SAGA, getAllUserForDropdown)
}



// ----------------- Create Task -----------------
function* createTaskSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.createTask(action.newTask))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type: CLOSE_DRAWER })
            yield thongBaoSweetAlert('Create task successfully !', 'success')
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Create task unsuccessfully !',
            'error',
            `${error.response.data.content}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}



// ----------------- Get All Status -----------------
function* getAllStatusSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllStatus())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_STATUS,
                arrStatus: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga)
}



// ----------------- Get Project Detail ONLY for Create Task -----------------
function* getProjectDetailOnlyForCreateTask(action) {
    try {
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_FOR_CREATE_TASK,
                projectDetailOnlyForCreateTask: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetProjectDetailOnlyForCreateTask() {
    yield takeLatest(GET_PROJECT_DETAIL_FOR_CREATE_TASK_SAGA, getProjectDetailOnlyForCreateTask)
}



// ----------------- Delete Task -----------------
function* deleteTaskSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.deleteTask(action.taskId))

        if (status === STATUS_CODE.SUCCESS) {

            yield thongBaoSweetAlert(
                'Delete task successfully !',
                'success',
            )

            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.projectId
            })
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Delete task unsuccessfully !',
            'error',
            `${error.response.data.content}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiDeleteTaskSaga() {
    yield takeLatest(DELETE_TASK_SAGA, deleteTaskSaga)
}