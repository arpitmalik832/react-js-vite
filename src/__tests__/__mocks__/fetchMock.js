const fetchMock = (data, isRejected) =>
  jest.fn().mockImplementation(() => {
    if (isRejected) {
      return Promise.reject(new Error('xyz'));
    }
    return Promise.resolve(data);
  });

export default fetchMock;
