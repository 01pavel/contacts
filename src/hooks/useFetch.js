import { useState, useCallback } from 'react';

export const fetchStatuses = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  error: 'error',
};

export const useFetch = (asyncFunction) => {
  const [status, setStatus] = useState(fetchStatuses.idle);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // "execute" wraps asyncFunction and handles the
  // setting of the state for the status, data and error
  const execute = useCallback(
    (payload) => {
      setStatus(fetchStatuses.pending);
      setData(null);
      setError(null);

      return asyncFunction(payload)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setStatus(fetchStatuses.success);
        })
        .catch((error) => {
          setError(error);
          setStatus(fetchStatuses.error);
        });
    },
    [asyncFunction],
  );

  return { execute, status, data, error, setData };
};
