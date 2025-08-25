// utils/createResponse.ts
export interface ApiResponse<T = any> {
    status: "success" | "error";
    statusCode: number;
    message: string;
    result?: T;
  }
  
  export const createResponse = <T>(
    status: "success" | "error",
    statusCode: number,
    message: string,
    result?: T
  ): ApiResponse<T> => {
    return { status, statusCode, message, ...(result && { result }) };
  };
  