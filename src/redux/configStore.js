import { applyMiddleware, combineReducers, createStore } from 'redux'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './saga/rootSaga';

// ------- Import reducers files -------
import { LoadingReducer } from './reducers/LoadingReducer';
import { UserReducer } from './reducers/UserReducer';
import { DrawerReducer } from './reducers/DrawerReducer';
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserInfoAfterLoginReducer } from './reducers/UserInfoAfterLoginReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskReducer } from './reducers/TaskReducer';

// -----------------------------------------------------
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    UserReducer,
    DrawerReducer,
    HistoryReducer,
    UserInfoAfterLoginReducer,
    ProjectReducer,
    TaskReducer
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga))

middleWareSaga.run(rootSaga);

export default store;