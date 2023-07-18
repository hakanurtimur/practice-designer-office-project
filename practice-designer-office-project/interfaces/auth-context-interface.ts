import { AuthError, User, UserCredential } from "@firebase/auth";

export interface authContextInterface {
  // user states
  user: User | undefined | null;
  error: Error | undefined;
  loading: boolean;
  // signup function and its states
  signUp: (email: string, password: string) => Promise<void>;
  createdUser: UserCredential | undefined;
  createError: AuthError | undefined;
  createLoading: boolean;
  // signOut function
  signOut: () => Promise<boolean>;
  signOutError: Error | AuthError | undefined;
  signOutLoading: boolean;
  // login function and its states
  login: (
    email: string,
    password: string,
  ) => Promise<UserCredential | undefined>;
  loginError: AuthError | undefined;
  loggedInUser: UserCredential | undefined;
  loginLoading: boolean;
  // userRole
  userRole: string | undefined;
}
export interface fetchedUser {
  id: string;
  createdAt: string;
  role: string;
}
