import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";

export enum requestState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  FULFILLED = "FULFILLED",
}

export const useAsync = (request: () => Promise<AxiosResponse<any, any>>) => {
  const [status, setStatus] = useState(requestState.IDLE);
  const [value, setValue] = useState<unknown>();
  const [error, setError] = useState(false);

  const execute = useCallback(async () => {
    setStatus(requestState.LOADING);

    return request()
      .then((data) => {
        const validRequestStatuses = [200, 201, 202, 100, 101, 102];
        if (data.status === 204) return;
        if (validRequestStatuses.includes(data.status)) {
          const result = data.data.json() ? data.data.json() : data;
          setValue(result);
          return result;
        }
        setError(true);
      })
      .catch(() => setError(true))
      .finally(() => {
        setStatus(requestState.FULFILLED);
      });
  }, [request]);

  return { execute, status, value, error };
};
