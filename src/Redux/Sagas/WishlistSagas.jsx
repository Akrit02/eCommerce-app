import { put, takeEvery } from "redux-saga/effects"
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {               //worker Saga
    let response = yield createRecord("wishlist", action.payload)
    yield put({ type: CREATE_WISHLIST_RED, payload: response })

    // let response = yield createMultipartRecord("wishlist", action.payload)
    // yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga() {                        //worker Saga
    let response = yield getRecord("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* deleteSaga(action) {               //worker Saga
    yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* wishlistSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)        //watcher Saga
    yield takeEvery(GET_WISHLIST, getSaga)              //watcher Saga
    yield takeEvery(DELETE_WISHLIST, deleteSaga)        //watcher Saga
}