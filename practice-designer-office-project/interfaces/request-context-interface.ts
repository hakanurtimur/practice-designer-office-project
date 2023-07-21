import { DocumentData, FirestoreError } from "@firebase/firestore";

export interface requestContextInterface {
  value: DocumentData | undefined;
  error: FirestoreError | undefined;
  loading: boolean;
  // CLIENT SIDE
  // --- Functions ---
  createRequest: (title: string, description: string) => Promise<void>;
  // states
  creatingError: FirestoreError | undefined | null;
  creatingLoading: boolean;
  // --- Variables ---
}
