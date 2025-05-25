import { httpClientS3 } from './utils/httpClientS3';

class S3Service {
  async uploadImageS3({
    preSignedURL,
    file,
  }: {
    preSignedURL: string;
    file: File;
  }) {
    await httpClientS3.put(preSignedURL, file, {
      headers: { 'Content-Type': file.type },
    });
  }
}

export default new S3Service();
