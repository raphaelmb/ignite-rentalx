import { S3 } from "aws-sdk";
import { resolve } from "node:path";
import { IStorageProvider } from "../IStorageProvider";

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: "",
    });
  }

  async save(file: string, folder: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async delete(file: string, folder: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
