import axios from "axios";

export async function postRequest(url, body) {
    const request = axios.post(url, body);
    const response = request.then((response) => response);
    return response;
}

export async function postRequestWithConfig(url, body, config) {
    const request = axios.post(url, body, config);
    const response = request.then((response) => response);
    return response;
}

export async function getRequest(url) {
    const request = axios.get(url);
    const response = request.then((response) => response);
    return response;
}

export async function getRequestWithConfig(url, config) {
    const request = axios.get(url, {params: config});
    const response = request.then((response) => response);
    return response;
}

export async function deleteRequest(url) {
    const request = axios.delete(url);
    const response = request.then((response) => response);
    return response;
}

export async function putRequest(url, body) {
    const request = axios.put(url, body);
    const response = request.then((response) => response);
    return response;
}

export async function putWithParams(url, config) {
    const request = axios.put(url, {params: config});
    const response = request.then((response) => response);
    return response;
}