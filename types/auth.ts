export interface LoginCredentials {
  accessKey: string;
  secretKey: string;
  region: string;
}

export interface LoginResponse {
  status: string;
  message?: string;
  data?: {
    sessionToken: string;
    accessKeyId: string;
  };
}
