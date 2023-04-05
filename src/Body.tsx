import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai'
import MainContainer from './components/MainContainer';
import Confirm from './components/Confirm';
import Alert from './components/Alert';
import Spinner from './components/Spinner.js';
import HelpSection from './components/HelpSection.js';
import { dialogAtom } from './atoms/dialogAtoms';

export default function Body() {
    const dialog = useAtomValue(dialogAtom)

    useEffect(() => {
    }, [])
    return <>
        <MainContainer />
        <div id="goTop"><div></div></div>
        {dialog.confirm.show ? <Confirm message={dialog.confirm.message} actions={dialog.confirm.actions} /> : <></>}
        {dialog.alert.show ? <Alert message={dialog.alert.message} /> : <></>}
        {dialog.custom.show ? dialog.custom.dialog : <></>}
    </>
}
