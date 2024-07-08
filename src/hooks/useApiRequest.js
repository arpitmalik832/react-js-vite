import { handleRequest } from '../utils/apiUtils';

const useApiRequest = () => {
  let abortControllers = {};

  const createAbortController = key => {
    if (!abortControllers[key]) {
      abortControllers[key] = new AbortController();
    }

    return abortControllers[key];
  };

  const makeGetCall = ({ axiosInstance, url, config }) => {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest(
      axiosInstance.get(url, {
        ...config,
        signal,
      }),
    );
  };

  const makePostCall = ({ axiosInstance, url, config, body }) => {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest(
      axiosInstance.post(url, body, {
        ...config,
        signal,
      }),
    );
  };

  const makePutCall = ({ axiosInstance, url, config, body }) => {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest(
      axiosInstance.put(url, body, {
        ...config,
        signal,
      }),
    );
  };

  const makeDeleteCall = ({ axiosInstance, url, config }) => {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest(
      axiosInstance.delete(url, {
        ...config,
        signal,
      }),
    );
  };

  const cancelRequest = key => {
    if (abortControllers[JSON.stringify(key)]) {
      abortControllers[JSON.stringify(key)].abort();
      delete abortControllers[JSON.stringify(key)];
    }
  };

  const cancelAllRequests = () => {
    Object.keys(abortControllers).forEach(key => {
      abortControllers[key].abort();
    });
    abortControllers = {};
  };

  return {
    makeGetCall,
    makePostCall,
    makePutCall,
    makeDeleteCall,
    cancelRequest,
    cancelAllRequests,
  };
};

export default useApiRequest;
