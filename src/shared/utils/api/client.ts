import queryString from "query-string";
import { RcFile } from "antd/lib/upload";

const API_URL = process.env.REACT_APP_API_URL;

const requestErrorHandler = (error: unknown) => {
  // TODO: If we want to handle a generic error
  throw error;
};

enum method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type GetType<T> = {
  data?: T;
  path: string;
};

export const get = async <T>(request: GetType<T>): Promise<T> => {
  const { data = {}, path } = request;
  return fetch(`${API_URL}/${path}?${queryString.stringify(data)}`, {
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    method: method.GET,
  })
    .then((response) => response.json() as Promise<T>)
    .catch(requestErrorHandler);
};

type PostType<T> = {
  data?: T;
  path: string;
  headers?: Record<string, unknown>;
};

export const post = async <T>({ data, path, headers }: PostType<T>) => {
  return fetch(`${API_URL}/${path}`, {
    method: method.POST,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).catch(requestErrorHandler);
};

interface PutType<T> extends PostType<T> {
  id?: string;
}

export const put = async <T>({ id, data, path }: PutType<T>) => {
  return fetch(`${API_URL}/${path}/${id}`, {
    method: method.PUT,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).catch(requestErrorHandler);
};

interface PatchType<T> extends PostType<T> {
  id?: string;
}

export const patch = async <T>({ id, data, path }: PatchType<T>) => {
  return fetch(`${API_URL}/${path}/${id}`, {
    method: method.PATCH,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).catch(requestErrorHandler);
};

interface DeleteType {
  id?: string;
  path?: string;
}

export const remove = async ({ id, path }: DeleteType) => {
  return fetch(`${API_URL}/${path}/${id}`, {
    method: method.DELETE,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).catch(requestErrorHandler);
};

export const putFileWithSignedUrl = async (
  signedUrl: string,
  file: File | RcFile
) => {
  return fetch(signedUrl, {
    method: method.PUT,
    body: file,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": file.type },
  });
};
