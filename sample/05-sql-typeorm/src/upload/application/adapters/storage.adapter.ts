import { Injectable } from '@nestjs/common';
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class StorageAdapter {
  private s3Client: S3Client;
  constructor() {
    const REGION = 'us-east-1';
    // Create an Amazon S3 service client object.
    this.s3Client = new S3Client({
      region: REGION,
      endpoint: 'https://storage.yandexcloud.net',
      credentials: {
        secretAccessKey: '',
        accessKeyId: 'YCAJEEIsUY0Xq4cCtfvvdbA6O',
      },
    });
  }

  async saveFile(content: Buffer, id: string, filename: string) {
    const key = `files/${id}_${filename}`;

    const bucketParams: PutObjectCommandInput = {
      Bucket: 'backettest',
      // Specify the name of the new object. For example, 'index.html'.
      // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
      Key: key,
      // Content of the new object.
      Body: content,
      ContentType: 'image/jpeg',
    };

    const command = new PutObjectCommand(bucketParams);
    try {
      const result = await this.s3Client.send(command);
      console.log('result upload', result);

      return {
        result: result,
        url: key,
      };
    } catch (error) {
      console.log(error);

      throw new Error();
    }
  }
}
