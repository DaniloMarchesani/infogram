import axios from "axios";
import React, { ReactNode, createContext, useContext, useReducer } from "react";
import IUser from "../interfaces/User";
import IProfile from "../interfaces/Profile";
import { useNavigate } from "react-router-dom";

const { VITE_BACKEND_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_BACKEND_URL,
});

interface IAuthContext {
  loading: boolean;
  user: IUser | null;
  profile: IProfile | null;
  setAsLogged: (user: IUser) => void;
  setProfile: (profile: IProfile) => void;
  logout: () => void;
}

type TAuthAction =
  | { type: "SET_AS_LOGGED"; payload: IUser }
  | { type: "SET_PROFILE"; payload: IProfile }
  | { type: "LOGOUT" };

const AuthContext = createContext<IAuthContext | null>(null);

const authReducer = (
  state: IAuthContext,
  action: TAuthAction
): IAuthContext => {
  switch (action.type) {
    case "SET_AS_LOGGED":
      const { token } = action.payload;
      api.interceptors.request.use((config: any) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      return { ...state, user: action.payload };

    case "SET_PROFILE":
      return { ...state, profile: action.payload, loading: true };

    case "LOGOUT":
      return { ...state, user: null, profile: null, loading: false };

    default:
      return state;
  }
};

const initialState: IAuthContext = {
  loading: true,
  user: null,
  profile: null,
  setAsLogged: () => {},
  setProfile: () => {},
  logout: () => {},
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAsLogged = (user: IUser) => {
    dispatch({ type: "SET_AS_LOGGED", payload: user});
  }

  const setProfile = (profile: IProfile) => {
    dispatch({ type: "SET_PROFILE", payload: profile})
  }

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{...state, setAsLogged, setProfile, logout}}>
      {children}
    </AuthContext.Provider>
  )

};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error("use must be used within an AuthProvider");
  }

  return context;
}


export { AuthProvider, useAuth, api };
