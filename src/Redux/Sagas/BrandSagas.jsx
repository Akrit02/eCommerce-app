import { put, takeEvery } from "redux-saga/effects"
import { CREATE_BRAND, CREATE_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {               //worker Saga
    let response = yield createRecord("brand", action.payload)
    yield put({ type: CREATE_BRAND_RED, payload: response })

    // let response = yield createMultipartRecord("brand", action.payload)
    // yield put({ type: CREATE_BRAND_RED, payload: response })
}

function* getSaga() {               //worker Saga
    let response = yield getRecord("brand")
    yield put({ type: GET_BRAND_RED, payload: response })
}

function* updateSaga(action) {               //worker Saga
    yield updateRecord("brand", action.payload)
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })

    // yield updateMultipartRecord("brand", action.payload)
    // yield put({ type: UPDATE_BRAND_RED, payload: response })
}

function* deleteSaga(action) {               //worker Saga
    yield deleteRecord("brand", action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}

export default function* brandSagas() {
    yield takeEvery(CREATE_BRAND, createSaga)        //watcher Saga
    yield takeEvery(GET_BRAND, getSaga)              //watcher Saga
    yield takeEvery(UPDATE_BRAND, updateSaga)        //watcher Saga
    yield takeEvery(DELETE_BRAND, deleteSaga)        //watcher Saga
}