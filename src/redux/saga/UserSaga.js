import { call, delay, put, select, takeLatest } from 'redux-saga/effects'

// --------- Import service ---------
import { userService } from '../../services/UserService';

// --------- Import constant ---------
import {
    ASSIGN_USER_TO_PROJECT,
    CLOSE_DRAWER,
    DELETE_USER_SAGA,
    DISPLAY_LOADING,
    EDIT_USER_SAGA,
    GET_ALL_PROJECT_SAGA,
    GET_USER,
    GET_USER_FOR_AUTOCOMPLETE,
    GET_USER_SAGA,
    GET_USER_WITH_KEYWORD,
    GET_USER_WITH_KEYWORD_WITHOUT_LOADING,
    HIDE_LOADING,
    REMOVE_USER_FROM_PROJECT,
    SIGN_IN_SAGA,
    SIGN_UP_SAGA,
    STATUS_CODE,
    TOKEN,
    USER_LOGIN,
    USLOGIN
} from '../constants/constants';

// --------- Import other libraries ---------
import Swal from 'sweetalert2'


const thongBaoSweetAlert = (title, icon, text = '') => {
    return Swal.fire({
        title: title,
        icon: icon,
        text: text,
        confirmButtonText: 'Close'
    })
}

// ----------------- Signup User -----------------
function* signupUserSaga(action) {
    try {
        const { data, status } = yield call(() => userService.signupUser(action.newUser))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert('Signup new user successfully !', 'success')
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Signup new user unsuccessfully !',
            'error',
            `${error.response.data.message}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiSignupUser() {
    yield takeLatest(SIGN_UP_SAGA, signupUserSaga)
}



// ----------------- Login (Signin) User -----------------
function* signinUserSaga(action) {
    try {
        const { data, status } = yield call(() => userService.signinUser(action.user))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert('Login successfully !', 'success')

            localStorage.setItem(TOKEN, data.content.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

            yield put({
                type: USLOGIN,
                userLoginInfo: data.content
            })

            yield put({ type: DISPLAY_LOADING })
            yield delay(1500)
            yield put({ type: HIDE_LOADING })

            // Redirect after user login
            let history = yield select(state => state.HistoryReducer.history)
            history.push('/')
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Login unsuccessfully !',
            'error',
            `${error.response.data.message}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiSigninUser() {
    yield takeLatest(SIGN_IN_SAGA, signinUserSaga)
}



// ----------------- Get User -----------------
function* getUserSaga(action) {
    try {
        const { data, status } = yield call(() => userService.getAllUser())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER,
                allUser: data.content
            })
        }
    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetUser() {
    yield takeLatest(GET_USER_SAGA, getUserSaga)
}


// ----------------- Get User With Keyword-----------------
function* getUserWithKeywordSaga(action) {
    try {
        const { data, status } = yield call(() => userService.getAllUserWithKeyWord(action.keyword))

        if (status === STATUS_CODE.SUCCESS) {

            yield put({ type: DISPLAY_LOADING })
            yield delay(1200)
            yield put({ type: HIDE_LOADING })

            yield put({
                type: GET_USER,
                allUser: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetUserWithKeyword() {
    yield takeLatest(GET_USER_WITH_KEYWORD, getUserWithKeywordSaga)
}


// ----------------- Get User With Keyword Without Loading -----------------
function* getUserWithKeywordWithoutLoadingSaga(action) {
    try {
        const { data, status } = yield call(() => userService.getAllUserWithKeyWord(action.keyword))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_FOR_AUTOCOMPLETE,
                userSearchAutocomplete: data.content
            })
        }

    } catch (error) {
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiGetUserWithKeywordWithoutLoadingSaga() {
    yield takeLatest(GET_USER_WITH_KEYWORD_WITHOUT_LOADING, getUserWithKeywordWithoutLoadingSaga)
}



// ----------------- Delete User -----------------
function* deleteUserSaga(action) {
    try {
        const { data, status } = yield call(() => userService.deleteUser(action.userId))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert('Delete user successfully !', 'success')
            yield put({ type: GET_USER_SAGA })
        }

    } catch (error) {
        yield thongBaoSweetAlert('Delete user unsuccessfully !', 'error')
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}


// ----------------- Edit User -----------------
function* editUserSaga(action) {
    try {
        const { data, status } = yield call(() => userService.editUser(action.editedUser))

        if (status === STATUS_CODE.SUCCESS) {


            let informationOfUserFromLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN))

            // Nếu chỉnh sửa thông tin của chính người hiện đang Login thì sẽ lưu thông tin cập nhật vào local storage. Nếu chỉnh sửa thông tin không phải của người hiện đang Login thì chỉ update trên backend
            if (informationOfUserFromLocalStorage.id == action.editedUser.id) {
                let avatarUpdated = `https://ui-avatars.com/api/?name=${action.editedUser.name}`

                let informationOfUserFromLocalStorageSauKhiUpdate = {
                    ...informationOfUserFromLocalStorage,
                    email: action.editedUser.email,
                    name: action.editedUser.name,
                    phoneNumber: action.editedUser.phoneNumber,
                    avatar: avatarUpdated
                }

                localStorage.setItem(USER_LOGIN, JSON.stringify(informationOfUserFromLocalStorageSauKhiUpdate))
            }

            yield put({ type: CLOSE_DRAWER })
            yield thongBaoSweetAlert('Edit user successfully !', 'success')

            yield put({ type: DISPLAY_LOADING })
            yield delay(1000)
            yield put({ type: HIDE_LOADING })

            yield put({ type: GET_USER_SAGA })
        }

    } catch (error) {
        yield thongBaoSweetAlert('Edit user unsuccessfully !', 'error')
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiEditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}


// ----------------- Assign User To Project -----------------
function* assignUserToProjectSaga(action) {
    try {
        const { data, status } = yield call(() => userService.assignUserToProject(action.projectAndUserId))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert('Add member to the project successfully !', 'success')
            yield put({ type: GET_ALL_PROJECT_SAGA })
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Add user to the project unsuccessfully !',
            'error',
            `${error.response.data.content}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiAssignUserToProjectSaga() {
    yield takeLatest(ASSIGN_USER_TO_PROJECT, assignUserToProjectSaga)
}



// ----------------- Remove User From Project -----------------
function* removeUserFromProject(action) {
    try {
        const { data, status } = yield call(() => userService.removeUserFromProject(action.projectAndUserId))

        if (status === STATUS_CODE.SUCCESS) {
            yield thongBaoSweetAlert('Remove member from project successfully !', 'success')
            yield put({ type: GET_ALL_PROJECT_SAGA })
        }

    } catch (error) {
        yield thongBaoSweetAlert(
            'Remove user from project unsuccessfully !',
            'error',
            `${error.response.data.content}`
        )
        console.log('Lỗi: ', error);
    }
}

export function* theoDoiRemoveUserFromProject() {
    yield takeLatest(REMOVE_USER_FROM_PROJECT, removeUserFromProject)
}