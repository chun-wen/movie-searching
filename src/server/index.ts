import axios, { AxiosInstance } from 'axios';

import Toast from '@/components/toast';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTg4Mzk0ZTk1YjMwZTI1NjE5MjFlN2MyOWVlZmI5NSIsInN1YiI6IjY0YmJhMTgwNThlZmQzMDEzOTUzMDE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2KBP-Wb6GNGwDdlsA8pDqGk76oaBepBPNERpwSUp1oE';

export class BasicService {
  fetcher: AxiosInstance;
  constructor() {
    this.fetcher = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      timeout: 1000,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    this.fetcher.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        if (error.status_code === 7) {
          Toast({
            message: error.status_message,
            status: 'error',
          });
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );
  }
}