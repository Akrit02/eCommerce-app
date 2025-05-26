import { put, takeEvery } from "redux-saga/effects"
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {               //worker Saga
    let response = yield createRecord("testimonial", action.payload)
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })

    // let response = yield createMultipartRecord("testimonial", action.payload)
    // yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })
}

function* getSaga() {               //worker Saga
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}

function* updateSaga(action) {               //worker Saga
    yield updateRecord("testimonial", action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })

    // yield updateMultipartRecord("testimonial", action.payload)
    // yield put({ type: UPDATE_TESTIMONIAL_RED, payload: response })
}

function* deleteSaga(action) {               //worker Saga
    yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}

export default function* testimonialSagas() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)        //watcher Saga
    yield takeEvery(GET_TESTIMONIAL, getSaga)              //watcher Saga
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)        //watcher Saga
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)        //watcher Saga
}