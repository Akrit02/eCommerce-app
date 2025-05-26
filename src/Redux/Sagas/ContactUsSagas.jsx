import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CONTACTUS, CREATE_CONTACTUS_RED, DELETE_CONTACTUS, DELETE_CONTACTUS_RED, GET_CONTACTUS, GET_CONTACTUS_RED, UPDATE_CONTACTUS, UPDATE_CONTACTUS_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {               //worker Saga
    let response = yield createRecord("contactus", action.payload)
    yield put({ type: CREATE_CONTACTUS_RED, payload: response })

    // let response = yield createMultipartRecord("contactus", action.payload)
    // yield put({ type: CREATE_CONTACTUS_RED, payload: response })
}

function* getSaga() {                        //worker Saga
    let response = yield getRecord("contactus")
    yield put({ type: GET_CONTACTUS_RED, payload: response })
}

function* updateSaga(action) {               //worker Saga
    yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTACTUS_RED, payload: action.payload })

    // yield updateMultipartRecord("contactus", action.payload)
    // yield put({ type: UPDATE_CONTACTUS_RED, payload: response })
}

function* deleteSaga(action) {               //worker Saga
    yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACTUS_RED, payload: action.payload })
}

export default function* contactusSagas() {
    yield takeEvery(CREATE_CONTACTUS, createSaga)        //watcher Saga
    yield takeEvery(GET_CONTACTUS, getSaga)              //watcher Saga
    yield takeEvery(UPDATE_CONTACTUS, updateSaga)        //watcher Saga
    yield takeEvery(DELETE_CONTACTUS, deleteSaga)        //watcher Saga
}