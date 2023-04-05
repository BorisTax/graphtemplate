import React from 'react';
import Modal from './Modal';
import { useSetAtom } from 'jotai';
import { DialogActions, dialogAtom, setDialogAtom } from '../atoms/dialogAtoms';

export default function Alert({message}:{message: string}){
    const setDialog = useSetAtom(setDialogAtom)
    return <Modal header={message}>
                    <hr/>
                    <div className="flex-center">
                    <button onClick={()=>{setDialog({type: DialogActions.SHOW_ALERT, payload: {show: false}})}}/>
                    </div>    
            </Modal>
}