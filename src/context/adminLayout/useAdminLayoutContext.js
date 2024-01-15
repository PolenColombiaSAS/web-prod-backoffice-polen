import { useContext } from "react";
import { AdminLayoutContext } from "./AdminLayoutContext";

export const useAdminLayoutContext = () => {
    return useContext(AdminLayoutContext);
  };
  