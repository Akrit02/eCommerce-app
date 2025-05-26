import { put, takeEvery } from "redux-saga/effects"
import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {               //worker Saga
    let response = yield createRecord("product", action.payload)
    yield put({ type: CREATE_PRODUCT_RED, payload: response })

    // let response = yield createMultipartRecord("product", action.payload)
    // yield put({ type: CREATE_PRODUCT_RED, payload: response })
}

function* getSaga() {               //worker Saga
    let response = yield getRecord("product")
    yield put({ type: GET_PRODUCT_RED, payload: response })
}

function* updateSaga(action) {               //worker Saga
    yield updateRecord("product", action.payload)
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })

    // yield updateMultipartRecord("product", action.payload)
    // yield put({ type: UPDATE_PRODUCT_RED, payload: response })
}

function* deleteSaga(action) {               //worker Saga
    yield deleteRecord("product", action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}

export default function* productSagas() {
    yield takeEvery(CREATE_PRODUCT, createSaga)        //watcher Saga
    yield takeEvery(GET_PRODUCT, getSaga)              //watcher Saga
    yield takeEvery(UPDATE_PRODUCT, updateSaga)        //watcher Saga
    yield takeEvery(DELETE_PRODUCT, deleteSaga)        //watcher Saga
}