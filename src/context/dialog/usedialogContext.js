import { useContext } from "react";
import { DialogContext } from ".";

export const useDialogContext = () => {
    return useContext(DialogContext);
};