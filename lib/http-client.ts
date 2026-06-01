import {getItem} from "@/lib/storage";
import IUser from "@/interfaces/IUser";


/**
 * Sends an HTTP GET request to the specified URL.
 * @param {string | URL} url - The URL to send the HTTP GET request to.
 * @param _headers
 * @param token
 * @return {Promise<Response>} - A Promise that resolves to the Response object of the HTTP GET request.
 */
export async function httpGET(
    url: string | URL,
    _headers: object = {},
    token: string | null = null
): Promise<Response> {
    return await httpClient(url, { method: "GET" }, _headers, token);
}
/**
 * Makes a POST request to the specified URL with the provided data.
 *
 * @param {string | URL} url - The URL to send the POST request to.
 * @param {*} data - The data to send in the request body.
 * @param _headers
 * @return {Promise} - A Promise that resolves with the response from the POST request.
 */
export async function httpPOST(
    url: string | URL,
    data: any,
    _headers: object = {},
): Promise<Response> {
    return await httpClient(url, { body: data, method: "POST" }, _headers);
}

/**
 * Sends an HTTP PUT request to the specified URL with the provided data.
 *
 * @param {string | URL} url - The URL to send the PUT request to.
 * @param {any} data - The data to send in the request body.
 *
 * @param _headers
 * @return {Promise<Response>} - A promise that resolves with the response from the server.
 */
export async function httpPUT(
    url: string | URL,
    data: any,
    _headers: object = {},
): Promise<Response> {
    return await httpClient(url, { body: data, method: "PUT" }, _headers);
}

export async function httpPATCH(
    url: string | URL,
    data: any,
    _headers: object = {},
): Promise<Response> {
    return await httpClient(url, { body: data, method: "PATCH" }, _headers);
}

/**
 * Make an HTTP DELETE request.
 *
 * @param {string | URL} url - The URL to send the request to.
 * @param {any | null} [data] - The data to send with the request.
 * @return {Promise<Response>} A Promise that resolves to a Response object.
 */
export async function httpDELETE(
    url: string | URL,
    data?: any | null,
    _headers: object = {},
): Promise<Response> {
    return await httpClient(url, { body: data, method: "DELETE" });
}

/**
 * Sends an HTTP request to the specified URL with the given options.
 *
 * @param {string | URL} url - The URL to send the request to.
 * @param {object | null} options - The options for the request. Default is null.
 * @param _headers
 * @param token
 * @returns {Promise<Response>} - A Promise that resolves to a Response object representing the response to the request.
 */
export default async function httpClient(
    url: string | URL,
    options?: object | null,
    _headers: object = {},
    token: string | null = null
): Promise<Response> {

    if(token == null){
        const user: IUser | null = await getItem("user");
        token = user?.token as string;
    }

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // inject the bearer token here
        "ngrok-skip-browser-warning": "zj",
        ..._headers,
    };

    const _options = { ...options, headers };

    return await fetch(url, _options);
}

export async function httpExternalServiceClient (
    url: string | URL,
    options?: object | null,
    _headers: object = {},
): Promise<Response> {
    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${process.env}`,
        "ngrok-skip-browser-warning": "zj",
        ..._headers,
    };

    const _options = { ...options, headers };

    return await fetch(url, _options);
}
