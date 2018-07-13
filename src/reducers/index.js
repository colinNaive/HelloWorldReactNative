/**
 * Created by colinambitious on 2018/7/12.
 */
'use strict'
import {combineReducers} from 'redux'
import listFetchData from './ListDataFetchReducer'

const rootReducer = combineReducers({//将所有的redux处理逻辑包装在一起
    listFetchData: listFetchData
})

export default rootReducer//导出，作为统一入口