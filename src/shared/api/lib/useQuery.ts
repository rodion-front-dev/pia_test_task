/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import axios, { AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios';

import { apiInstance } from '../api-instance';

const activeRequests: Record<string, CancelTokenSource> = {};
const responseCache = new Map<string, unknown>();

interface ApiRequestOptions {
  id?: string;
  cancelPrevious?: boolean;
  cache?: boolean;
  cacheStaleTime?: number;
  enabled?: boolean;
  retry?: number;
}

interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  refetch: () => void;
}

export function useQuery<T>(
  url: string,
  options: ApiRequestOptions & Omit<AxiosRequestConfig, 'url'> = {}
): QueryResult<T> {
  const {
    id,
    cancelPrevious = true,
    cache = !!id,
    cacheStaleTime = 1000 * 60 * 5,
    enabled = true,
    retry = 0,
    ...config
  } = options;

  const [result, setResult] = useState<Omit<QueryResult<T>, 'refetch'>>({
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
  });

  const cacheKey = id || url;

  const fetchData = async (attempt = 0): Promise<void> => {
    setResult((prev) => ({ ...prev, isLoading: true, isError: false, error: null }));

    if (cache && responseCache.has(cacheKey)) {
      setResult({
        data: responseCache.get(cacheKey) as T,
        isLoading: false,
        isError: false,
        error: null,
      });

      return;
    }

    if (id && cancelPrevious && activeRequests[id]) {
      activeRequests[id].cancel('Request replaced by new one');
      delete activeRequests[id];
    }

    const source = axios.CancelToken.source();

    if (id) {
      activeRequests[id] = source;
    }

    try {
      const response = await apiInstance({
        url,
        ...config,
        cancelToken: source.token,
      });

      if (cache) {
        responseCache.set(cacheKey, response.data);
        if (cacheStaleTime > 0) {
          setTimeout(() => {
            responseCache.delete(cacheKey);
          }, cacheStaleTime);
        }
      }

      setResult({
        data: response.data as T,
        isLoading: false,
        isError: false,
        error: null,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        setResult((prev) => ({ ...prev, isLoading: false }));

        return;
      }

      if (attempt < retry) {
        fetchData(attempt + 1);

        return;
      }

      setResult({
        data: undefined,
        isLoading: false,
        isError: true,
        error: error as AxiosError,
      });
    } finally {
      if (id) {
        delete activeRequests[id];
      }
    }
  };

  useEffect(() => {
    if (!enabled) return;
    fetchData();
  }, [url, enabled]);

  return {
    ...result,
    refetch: () => fetchData(),
  };
}

export function clearCache(key?: string) {
  if (key) {
    responseCache.delete(key);
  } else {
    responseCache.clear();
  }
}
