import {useState} from 'react';
import {DialogFullScreenContext} from '.';

export function DialogFullScreenProvider({children}) {
    const [dialogFullScreenTitle, setDialogFullScreenTitle] = useState(null);
    const [dialogFullScreenContent, setDialogFullScreenContent] = useState(null);
    const [dialogFullScreenActions, setDialogFullScreenActions] = useState(null);
    const [isDialogFullScreenOpen, setisDialogFullScreenOpen] = useState(false)

    function showDialogFullScreem(title, content, actions) {
        setDialogFullScreenTitle(title);
        setDialogFullScreenContent(content);
        setDialogFullScreenActions(actions);
        setisDialogFullScreenOpen(true);
    }
    function updateButtonDialogFullScreen( actions) {
        setDialogFullScreenActions(actions);
    }
    function hideDialogFullScreenOpen() {
        setDialogFullScreenTitle(null);
        setDialogFullScreenContent(null);
        setDialogFullScreenActions(null);
        setisDialogFullScreenOpen(false);
    }

    return ( <DialogFullScreenContext.Provider value = {
            {
                isDialogFullScreenOpen,
                showDialogFullScreem,
                hideDialogFullScreenOpen,
                dialogFullScreenTitle, 
                dialogFullScreenContent,
                dialogFullScreenActions,
                updateButtonDialogFullScreen
            }
        } > {
            children
        } </DialogFullScreenContext.Provider>
    );
}