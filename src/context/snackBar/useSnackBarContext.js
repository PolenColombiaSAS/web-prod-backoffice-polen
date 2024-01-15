import { useContext } from "react";
import { SnackBarContext } from ".";

export const useSnackBarContext = () => {
    return useContext(SnackBarContext);
  };
  