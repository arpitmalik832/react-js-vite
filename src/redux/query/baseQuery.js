import useApiRequest from '../../hooks/useApiRequest';

const axiosBaseQuery =
  () =>
  async ({ axiosInstance, url }) => {
    const { makeGetCall } = useApiRequest();
    try {
      const response = makeGetCall({
        axiosInstance,
        url,
      });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export default axiosBaseQuery;
