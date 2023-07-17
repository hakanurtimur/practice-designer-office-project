import { AuthError, UserCredential } from "@firebase/auth";

export interface authContextInterface {
  // signup function and its states
  signUp: (email: string, password: string) => Promise<void>;
  createdUser: UserCredential | undefined;
  createError: AuthError | undefined;
  createLoading: boolean;
}
