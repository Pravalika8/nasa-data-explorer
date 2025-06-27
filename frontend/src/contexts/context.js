import { createContext } from "react";
import { AlertType } from "../constants/InputConstant";

export const LoaderContext = createContext({
  loading: false,
  setLoading: () => { },
  loaderTitle: '',
  setLoaderTitle: () => { },
});

export const AlertContext = createContext({
  message: '',
  type: AlertType.SUCCESS,
  setMessage: () => { },
  alertTimeout: 3000,
  setAlertTimeout: () => { }
});

