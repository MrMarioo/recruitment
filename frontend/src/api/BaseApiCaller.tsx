import { backendHostname } from "../environments/environment";
import axios, { AxiosInstance, AxiosResponse } from "axios";
  
  export const API_BASE_URL = backendHostname;
  interface RequestOptions {
    params?: Record<string, string | number | null>;
  }
  
  export const HttpOptions = {
    headers: {},
    params: {},
    responseType: "json",
    withCredentials: false,
    timeout: 5000,
  };
  
  class BaseApiCaller {
    controllerPath: string;
    axiosInstance: AxiosInstance;
    constructor() {
      this.controllerPath = "";
      this.axiosInstance = axios.create({
        baseURL: `${API_BASE_URL}/api/`,
      });
    }
  
    async get(path: string, options: RequestOptions = {}): Promise<any> {
      if (options.params) {
        const searchParams = new URLSearchParams();
  
        Object.keys(options.params).forEach((key) => {
          const value = options.params![key];
          if (value != null) {
            searchParams.append(key, value.toString());
          }
        });
  
        if (searchParams.toString()) {
          path += '?' + searchParams.toString();
        }
      }
  
      const fullPath = this.getFullPath(path);
  
      return await this.axiosInstance.get(fullPath, {
        headers: {
          Accept: 'text/plain',
        },
        params: options.params || {},
      });
    }
  
  
    async post(path: string, body: any, options: RequestOptions = {}, contentType: string = "application/json"): Promise<AxiosResponse<any>> {
      const fullPath = this.getFullPath(path);
  
      try {
        return await this.axiosInstance.post(fullPath, body, {
          headers: {
            "Content-Type": contentType,
            Accept: "text/plain",
          },
          params: options.params || {},
        });
      } catch (error) {
        console.error(error);
        return { status: 500, statusText: 'Internal Server Error', headers: {}, config: {}, data: { ok: false } } as AxiosResponse;
      }
    }
  
    async put(path: string, body: any, options: RequestOptions = {}, contentType: string = "application/json"): Promise<AxiosResponse<any>> {
      const fullPath = this.getFullPath(path);
  
      try {
        return await this.axiosInstance.put(fullPath, body, {
          headers: {
            "Content-Type": contentType,
          },
          params: options.params || {},
        });
      } catch (error) {
        console.error(error);
        return { status: 500, statusText: 'Internal Server Error', headers: {}, config: {}, data: { ok: false } } as AxiosResponse;
      }
    }
  
    async delete(path: string, body: any, options: RequestOptions = {}, contentType: string = "application/json"): Promise<AxiosResponse<any>> {
      const fullPath = this.getFullPath(path) + body;
      console.log(fullPath);
      try {
        return await this.axiosInstance.delete(fullPath, {
          headers: {
            "Content-Type": contentType,
          }
        });
      } catch (error) {
        console.error(error);
        return { status: 500, statusText: 'Internal Server Error', headers: {}, config: {}, data: { ok: false } } as AxiosResponse;
      }
    }
    

    checkError(response) {
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        console.error("Response body:", response.body);
        throw new Error("Error with request");
      }
    }
  
    getFullPath(path) {
      return `${this.controllerPath}/${path}`;
    }
  }
  
  export default BaseApiCaller;
  