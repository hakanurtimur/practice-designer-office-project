import { StorageError, UploadTaskSnapshot } from "@firebase/storage";

export interface storageContextInterface {
  uploadImageHandler: (image: File, path: string) => void;
  uploading: boolean;
  uploadSnapshot: UploadTaskSnapshot | undefined;
  uploadError: StorageError | undefined;
}
