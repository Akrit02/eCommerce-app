import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {               //worker Saga
    let response = yield createRecord("checkout", action.payload)
    yield put({ type: CREATE_CHECKOUT_RED, payload: response })

    // let response = yield createMultipartRecord("checkout", action.payload)
    // yield put({ type: CREATE_CHECKOUT_RED, payload: response })
}

function* getSaga() {                        //worker Saga
    let response = yield getRecord("checkout")
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}

function* updateSaga(action) {               //worker Saga
    yield updateRecord("checkout", action.payload)
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })

    // yield updateMultipartRecord("checkout", action.payload)
    // yield put({ type: UPDATE_CHECKOUT_RED, payload: response })
}

function* deleteSaga(action) {               //worker Saga
    yield deleteRecord("checkout", action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}

export default function* checkoutSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)        //watcher Saga
    yield takeEvery(GET_CHECKOUT, getSaga)              //watcher Saga
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)        //watcher Saga
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)        //watcher Saga
}