import React, { useEffect } from 'react';
import { useAtom } from 'jotai'
import MainContainer from './components/MainContainer';
import Confirm from './components/Confirm';
import Alert from './components/Alert';
import Spinner from './components/Spinner.js';
import HelpSection from './components/HelpSection.js';
import { alertDialogAtom, confirmDialogAtom, customDialogAtom } from './atoms/dialogAtoms';

export default function Body() {
    const [alertDialog] = useAtom(alertDialogAtom)
    const [confirmDialog] = useAtom(confirmDialogAtom)
    const [customDialog] = useAtom(customDialogAtom)
    useEffect(() => {
    }, [])
    return <>
        <MainContainer />
        <div id="goTop"><div></div></div>
        {confirmDialog.show ? <Confirm messageKey={confirmDialog.message} actions={confirmDialog.actions} /> : <></>}
        {alertDialog.show ? <Alert message={alertDialog.message} /> : <></>}
        {customDialog.show ? customDialog.dialog : <></>}
    </>
}
