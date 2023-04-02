import React from 'react';
import Modal from './Modal';
import { AlertDialog, alertDialogAtom } from '../atoms/dialogAtoms';
import { useSetAtom } from 'jotai';

export default function Alert({message}:{message: string}){
    const showAlert = useSetAtom(alertDialogAtom)
    return <Modal header={message}>
                    <hr/>
                    <div className="flex-center">
                    <button onClick={()=>{showAlert({show: false, message: ""})}}/>
                    </div>    
            </Modal>
}