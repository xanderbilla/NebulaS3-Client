import { ListObjectsRequest, ListObjectsResponse } from "@/types/api";
import { BaseService } from "./base.service";

const API_BASE_URL = "http://localhost:8080";

class S3Service extends BaseService {
  constructor() {
    super(API_BASE_URL);
  }

  async listObjects(request: ListObjectsRequest): Promise<ListObjectsResponse> {
    return this.request<ListObjectsResponse>(
      "/s3/list-objects",
      {
        method: "POST",
        body: JSON.stringify(request),
      },
      `list-objects-${request.bucketName}-${request.objectPrefix}`
    );
  }
}

export const s3Service = new S3Service();
