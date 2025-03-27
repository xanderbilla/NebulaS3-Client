import { ListObjectsRequest, ListObjectsResponse } from "@/types/api";
import { BaseService } from "./base.service";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

interface PresignedUrlResponse {
  success: boolean;
  message: string;
  data: string;
}

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

  async getPresignedUrl(
    bucketName: string,
    objectKey: string
  ): Promise<string> {
    const sessionToken = Cookies.get("sessionToken");
    if (!sessionToken) {
      throw new Error("No session token found. Please log in again.");
    }

    console.log("Making presigned URL request with:", {
      bucketName,
      objectKey,
      sessionToken: sessionToken.substring(0, 10) + "...", // Log partial token for debugging
    });

    try {
      const response = await this.request<PresignedUrlResponse>(
        "/s3/presigned-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            sessionToken: sessionToken,
          },
          body: JSON.stringify({
            bucketName,
            objectPrefix: objectKey,
          }),
        },
        `presigned-url-${bucketName}-${objectKey}`
      );

      console.log("Raw response from presigned URL request:", response);

      if (!response || !response.data) {
        console.error("Invalid response format:", response);
        throw new Error("Invalid response format from server");
      }

      return response.data;
    } catch (error) {
      console.error("Error in getPresignedUrl:", error);
      throw error;
    }
  }
}

export const s3Service = new S3Service();
