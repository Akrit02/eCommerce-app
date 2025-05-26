import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {               //worker Saga
    let response = yield createRecord("cart", action.payload)
    yield put({ type: CREATE_CART_RED, payload: response })

    // let response = yield createMultipartRecord("cart", action.payload)
    // yield put({ type: CREATE_CART_RED, payload: response })
}

function* getSaga() {                        //worker Saga
    let response = yield getRecord("cart")
    yield put({ type: GET_CART_RED, payload: response })
}

function* updateSaga(action) {               //worker Saga
    yield updateRecord("cart", action.payload)
    yield put({ type: UPDATE_CART_RED, payload: action.payload })

    // yield updateMultipartRecord("cart", action.payload)
    // yield put({ type: UPDATE_CART_RED, payload: response })
}

function* deleteSaga(action) {               //worker Saga
    yield deleteRecord("cart", action.payload)
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* cartSagas() {
    yield takeEvery(CREATE_CART, createSaga)        //watcher Saga
    yield takeEvery(GET_CART, getSaga)              //watcher Saga
    yield takeEvery(UPDATE_CART, updateSaga)        //watcher Saga
    yield takeEvery(DELETE_CART, deleteSaga)        //watcher Saga
}