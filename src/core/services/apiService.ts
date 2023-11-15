import axios from "axios";

export const PostApiMethod = (
    routeUrl: string,
    body: object,
    headers: { [index: string]: { [index: string]: string } } = { headers: {} }
) => {
    return axios.post(routeUrl, JSON.stringify(body), headers);
};

export const GetApiMethod = (routeUrl: string) => {
    return axios.get(routeUrl);
};

export const PutApiMethod = (routeUrl: string, body: object) => {
    return axios.put(routeUrl, JSON.stringify(body));
};

export const DeleteApiMethod = (routeUrl: string) => {
    return axios.delete(routeUrl);
};
