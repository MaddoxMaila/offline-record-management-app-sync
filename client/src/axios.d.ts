// src/types/axios.d.ts
import axios from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    headers?: {
      Authorization?: string;
      [key: string]: any;
    };
  }
}
