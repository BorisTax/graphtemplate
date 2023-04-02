import React from 'react';
import Modal from './Modal';
import { useAtomValue } from 'jotai';
import { captionsAtom } from '../atoms/languageAtoms';
import { DialogAction } from '../atoms/dialogAtoms';

export default function Confirm({message, actions}:{message: string, actions: DialogAction[]}){
        const captions = useAtomValue(captionsAtom)
        return <Modal header={message}>
                        <div className="flex-center">
                        {actions.map((action: DialogAction, index)=>
                            <button key={index} 
                                    onClick={()=>{action.onClick()}}>
                                    {action.caption}
                            </button>)}
                        </div>
                </Modal>

}