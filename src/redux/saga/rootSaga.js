import { all } from 'redux-saga/effects'
import * as UserSaga from './UserSaga'
import * as ProjectSaga from './ProjectSaga'
import * as TaskSaga from './TaskSaga'

export function* rootSaga() {
    yield all([
        // User saga
        UserSaga.theoDoiGetUser(),
        UserSaga.theoDoiGetUserWithKeyword(),
        UserSaga.theoDoiGetUserWithKeywordWithoutLoadingSaga(),
        UserSaga.theoDoiDeleteUserSaga(),
        UserSaga.theoDoiSignupUser(),
        UserSaga.theoDoiSigninUser(),
        UserSaga.theoDoiEditUserSaga(),
        UserSaga.theoDoiAssignUserToProjectSaga(),
        UserSaga.theoDoiRemoveUserFromProject(),


        // Project saga
        ProjectSaga.theoDoiGetAllProjectSaga(),
        ProjectSaga.theoDoiGetAllProjectWithKeywordSaga(),
        ProjectSaga.theoDoiGetProjectCategorySaga(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiDeleteProjectSaga(),
        ProjectSaga.theoDoiEditProjectSaga(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetAllTaskTypeSaga(),
        ProjectSaga.theoDoiGetAllPrioritySaga(),
        ProjectSaga.theoDoiGetAllProjectForDropdownSaga(),
        ProjectSaga.theoDoiGetAllUserForDropdown(),
        ProjectSaga.theoDoiCreateTaskSaga(),
        ProjectSaga.theoDoiGetAllStatusSaga(),
        ProjectSaga.theoDoiGetProjectDetailOnlyForCreateTask(),
        ProjectSaga.theoDoiDeleteTaskSaga(),


        // Task saga
        TaskSaga.theoDoiGetTaskDetail(),
        TaskSaga.theoDoiHandleSeriesChangeModalVaPostApi(),
        TaskSaga.theoDoiInsertComment(),
        TaskSaga.theoDoiDeleteCommentSaga(),
        TaskSaga.theoDoiUpdateCommentSaga(),
    ])
}