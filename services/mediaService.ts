import api from "../lib/api";

export interface FileUploadResponseDTO {
  publicId?: string;
  url?: string;
  secureUrl?: string;
  format?: string;
  resourceType?: string;
  size?: number;
  error?: string;
  errorMessage?: string;
}

export const mediaService = {
  async uploadImage(file: File): Promise<FileUploadResponseDTO> {
    const fd = new FormData();
    fd.append("file", file);
    const resp = await api.post(`/api/v1/media/upload/image`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    return resp.data as FileUploadResponseDTO;
  },

  async uploadImages(files: File[]): Promise<FileUploadResponseDTO[]> {
    const fd = new FormData();
    files.forEach(f => fd.append("files", f));
    const resp = await api.post(`/api/v1/media/upload/images`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    return resp.data as FileUploadResponseDTO[];
  },

  async uploadVideo(file: File): Promise<FileUploadResponseDTO> {
    const fd = new FormData();
    fd.append("file", file);
    const resp = await api.post(`/api/v1/media/upload/video`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    return resp.data as FileUploadResponseDTO;
  },

  async uploadVideos(files: File[]): Promise<FileUploadResponseDTO[]> {
    const fd = new FormData();
    files.forEach(f => fd.append("files", f));
    const resp = await api.post(`/api/v1/media/upload/videos`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    return resp.data as FileUploadResponseDTO[];
  },

  async deleteFile(publicId: string): Promise<{ [k: string]: string }> {
    const resp = await api.delete(`/api/v1/media/delete/${publicId}`);
    return resp.data as any;
  },

  async thumbnail(publicId: string, width = 200, height = 200): Promise<string> {
    const resp = await api.get(`/api/v1/media/thumbnail/${publicId}`, { params: { width, height } });
    return resp.data?.url as string;
  },
};


