/**
 * Created by colinambitious on 2018/7/12.
 */
import * as types from '../constants/ListDataFetchTypes'

//初始状态
const initListData = {
    refreshing: false,
    movies: null,
    childState: ''
}

//不同类别的事件 使用switch对应处理
export default function listFetchData(state = initListData, action) {
    switch (action.type) {
        case types.FETCH_LIST_DATA_DOING:
            return {
                ...state,
                refreshing: true
            }
            break
        case types.FETCH_LIST_DATA_DONE:
            return {
                ...state,
                refreshing: false,
                movies: action.movies
            }
            break
        case types.LIST_INIT_DATA:
            return {
                ...state,
                refreshing: action.refreshing,
                movies: action.movies,
                childState: action.childState
            }
            break
        default:
            return state
    }
}