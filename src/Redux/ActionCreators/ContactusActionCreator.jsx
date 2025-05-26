import { CREATE_CONTACTUS, DELETE_CONTACTUS, GET_CONTACTUS, UPDATE_CONTACTUS } from '../Constants'

export function createContactus(data) {
    return {
        type: CREATE_CONTACTUS,
        payload: data
    }
}

export function getContactus() {
    return {
        type: GET_CONTACTUS,
    }
}

export function updateContactus(data) {
    return {
        type: UPDATE_CONTACTUS,
        payload: data
    }
}

export function deleteContactus(data) {
    return {
        type: DELETE_CONTACTUS,
        payload: data
    }
}