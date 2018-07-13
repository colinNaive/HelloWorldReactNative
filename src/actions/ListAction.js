/**
 * Created by colinambitious on 2018/7/12.
 */
import * as types from '../constants/ListDataFetchTypes'

const api = 'https://api.douban.com/v2/movie/in_theaters';
import movies from '../../movies.json';

export function fetchListData() {
    return (dispatch, getState) => {
        if (getState.refreshing) {
            return;
        }
        dispatch(isFetching())
        fetch(api)
            .then((response) => response.text())
            .then((responseText) => {
                const json = JSON.parse(responseText);
                var movies = json.subjects
                dispatch(fetchSuccess(movies))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function isFetching() {
    return {
        type: types.FETCH_LIST_DATA_DOING,
        id: 1
    }
}

export function initData() {
    return {
        type: types.LIST_INIT_DATA,
        refreshing: false,
        movies: movies.subjects,
        childState: ''
    }
}

function fetchSuccess(movies) {
    return {
        type: types.FETCH_LIST_DATA_DONE,
        movies: movies
    }
}