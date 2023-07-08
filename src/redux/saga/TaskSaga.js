import { call, delay, put, select, takeLatest } from 'redux-saga/effects'

// --------- Import constant ---------
import {
    GET_TASK_DETAIL_SAGA,
    GET_TASK_DETAIL,
    STATUS_CODE,
    HANDLE_SERIES_CHANGE_MODAL_VA_POST_API_SAGA,
    UPDATE_TASK_MODAL,
    UPDATE_ASSIGNEE_IN_TASK_MODAL,
    REMOVE_ASSIGNEE_IN_TASK_MODAL,
    GET_PROJECT_DETAIL_SAGA,
    INSERT_COMMENT_SAGA,
    DELETE_COMMENT_SAGA,
    UPDATE_COMMENT_SAGA
} from '../constants/constants'

// --------- Import other libraries ---------
import Swal from 'sweetalert2'
import { taskService } from '../../services/TaskService'


// --------- Notification template for Sweet Alert ---------
const thongBaoSweetAlert = (title, icon, text = '') => {
    return Swal.fire({
        title: title,
        icon: icon,
        text: text,
        confirmButtonText: 'Close'
    })
}


// ----------------- Get All Task -----------------
function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(action.taskId))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetTaskDetail() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}




// ------ Update Task ===> Dùng function để chuyển 1 loạt hành động dispatch từ bất đồng bộ thành đồng bộ ------
export function* handleSeriesChangeModalVaPostApi(action) {

    // Gọi action làm thay đổi taskDetailModal
    switch (action.subActionType) {
        case UPDATE_TASK_MODAL: {
            const { name, value } = action
            yield put({
                type: UPDATE_TASK_MODAL,
                name,
                value
            })
        } break;

        case UPDATE_ASSIGNEE_IN_TASK_MODAL: {
            const { selectedUser } = action
            yield put({
                type: UPDATE_ASSIGNEE_IN_TASK_MODAL,
                selectedUser
            })
        } break;

        case REMOVE_ASSIGNEE_IN_TASK_MODAL: {
            const { userId } = action
            yield put({
                type: REMOVE_ASSIGNEE_IN_TASK_MODAL,
                userId
            })
        } break;

        default:
            break;
    }

    // Lấy dữ liệu từ TaskReducer.taskDetailModal sau khi taskDetailModal đã thay đổi
    let { taskDetailModal } = yield select(state => state.TaskReducer)

    // Biến đổi dữ liệu lấy từ TaskReducer.taskDetailModal thành dữ liệu API cần
    const listUserAsign = taskDetailModal.assigness?.map((item, index) => {
        return item.id
    })
    const taskDetailModalDeDuaLenApi = { ...taskDetailModal, listUserAsign }

    // Gọi API Update Task 

    try {
        const { data, status } = yield call(() => taskService.updateTask(taskDetailModalDeDuaLenApi))

        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskDetailModalDeDuaLenApi.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskDetailModalDeDuaLenApi.taskId
            })
        }
    } catch (error) {
        yield thongBaoSweetAlert(
            'Cannot change value !',
            'error',
            `${error.response.data.content}`
        )
        console.log('Lỗi: ', error);
    }

}


export function* theoDoiHandleSeriesChangeModalVaPostApi() {
    yield takeLatest(HANDLE_SERIES_CHANGE_MODAL_VA_POST_API_SAGA, handleSeriesChangeModalVaPostApi)
}



// ----------------- Insert Comment (Add Comment)-----------------
function* insertCommentSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.insertComment(action.commentOfUser))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert(
                'Post comment successfully !',
                'success',
                ``
            )

            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.commentOfUser.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.commentOfUser.taskId
            })
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Cannot post comment !',
            'error',
            `${error.response.data.content}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiInsertComment() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga)
}



// ----------------- Delete Comment -----------------
function* deleteCommentSaga(action) {

    try {
        const { data, status } = yield call(() => taskService.deleteComment(action.commentId))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert(
                'Delete comment successfully !',
                'success',
                ``
            )

            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskId
            })
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Cannot delete comment !',
            'error',
            `${error.response.data.content}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}



// ----------------- Update Comment -----------------
function* updateCommentSaga(action) {

    try {
        const { data, status } = yield call(() => taskService.updateComment(action.commentObject))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert(
                'Edit comment successfully !',
                'success',
                ``
            )

            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.commentObject.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.commentObject.taskId
            })
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Cannot edit comment !',
            'error',
            `${error.message}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiUpdateCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga)
}