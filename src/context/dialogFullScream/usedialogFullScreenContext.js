import { useContext } from "react";
import { DialogFullScreenContext } from ".";

export const useDialogFullScreenContext = () => {
    return useContext(DialogFullScreenContext);
};