import { S3Root } from "./S3Objects";

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  statusCode: number;
  timestamp: string;
}

export interface ListObjectsRequest {
  bucketName: string;
  objectPrefix: string;
}

export interface ListObjectsResponse extends ApiResponse<S3Root> {}
