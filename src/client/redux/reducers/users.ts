import userAction from '../types/users'
import {isEmpty} from '../../config/functions'

export function userLoginReducer(state=null,action){
    switch(action.type){
        case userAction.userLoginLoading:
            return{...state,loading:true}
        case userAction.userLogin:
            return{...state,isAuthenticated: !isEmpty(action.payload), loading:false}
            case userAction.userLogout:
      return { ...state, isAuthenticated: false, loading: false }
            default:
                return {...state}
    }
}

export function userMyProfileReducer(state=null, action){
    switch(action.type){
        case userAction.userMyProfileLoading:
            return {...state, loading: true}
            case userAction.userMyProfile:
                return {...state, profile: action.payload,loading:false}
                default:
                    return {...state}
    }
}

export function newsFeedReducer(state=null, action){
    switch(action.type){
        case userAction.news.newsFeedLoading:
            return {...state, loading: true}
            case userAction.news.newsFeed:
                return {...state, news: action.payload,loading:false}
                default:
                    return {...state}
    }
}

export function newsSubTypesReducer(state=null, action){
    switch(action.type){
        case userAction.news.subTypesLoading:
            return {...state, loading: true}
            case userAction.news.subTypes:
                return {...state, subTypes: action.payload,loading:false}
                default:
                    return {...state}
    }
}