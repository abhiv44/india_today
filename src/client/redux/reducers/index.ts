import {combineReducers}  from 'redux'
import {userLoginReducer, userMyProfileReducer, newsFeedReducer, newsSubTypesReducer } from './users'
import {loginSignupDialogBoxReducer} from './components'

const store = combineReducers({
    userLogin: userLoginReducer,
    loginSignupDialogBox: loginSignupDialogBoxReducer,
    userMyProfile: userMyProfileReducer,
    newsFeed:newsFeedReducer,
    newsSubType:newsSubTypesReducer
})
export default store;

export type RootState = ReturnType<typeof store>