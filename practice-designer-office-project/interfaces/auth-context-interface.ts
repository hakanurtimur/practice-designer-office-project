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

  // reset password function and its states
  sendPasswordReset: (email: string) => Promise<boolean>;
  sendPasswordError: Error | AuthError | undefined;
  sendingPassword: boolean;
  //update user profile
  updateUserProfile: ({
    displayName,
    photoURL,
  }: {
    displayName?: string | undefined;
    photoURL?: string | undefined;
  }) => Promise<void>;
  updateError: Error | AuthError | undefined;
  updating: boolean;
  // userRole
  getUserRole: () => Promise<string | undefined>;
  // all users
  allUsers: fetchedUser[] | undefined;
  // select user
  selectUser: (id: string) => fetchedUser | undefined;
  // assigned users for am
  myAssignedUsers: fetchedUser[] | undefined;
}

export interface fetchedUser {
  name: string;
  email: string;
  id: string;
  photoURL: string;
  role: string;
  assignedAmName: string;
  assignedAmId: string;
  createdAt: string;
}
