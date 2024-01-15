import { useContext } from "react";
import { DrawerContext } from ".";

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};