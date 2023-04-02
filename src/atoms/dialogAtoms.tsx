import { atom } from 'jotai'
import { SelectionSet, selectedShapeAtom, shapeAtom } from './shapeAtoms'
import Shape from '../components/shapes/Shape'
import { getAtomFunc, setAtomFunc } from './atoms'
import { captionsAtom } from './languageAtoms'
export type DialogButton = {
    caption: string,
    onClick: () => void
}
export type AlertDialog = {
    show: boolean,
    message: string
}
export type ConfirmDialog = {
    show: boolean,
    message: string,
    actions: DialogButton[]
}
export type CustomDialog = {
    show: boolean,
    dialog: React.FunctionComponent | null
}

export const alertDialogAtom = atom<AlertDialog>({ show: false, message: "" })
export const showAlert = atom(null, (_, set, {show, message}) => { set(alertDialogAtom, {show, message}) })
export const confirmDialogAtom = atom<ConfirmDialog>({ show: false, message: "", actions: [] })
export const showConfirm = atom(null, (_, set, { message, actions}) => { set(confirmDialogAtom, { show: true, message, actions}) })
export const hideConfirm = atom(null, (_, set, { message, actions}) => { set(confirmDialogAtom, { show: false, message, actions}) })
export const customDialogAtom = atom<CustomDialog>({ show: false, dialog: null })
export const showCustomDialog = atom(null, (_, set, { show, dialog}) => { set(customDialogAtom, { show, dialog}) })

export const deleteConfirm = (getAtom: getAtomFunc, setAtom: setAtomFunc) => {
    const captions = getAtom(captionsAtom)()
    const dialog: ConfirmDialog = {
        show: true,
        message: captions.messages.delete,
        actions: [
            {
            caption: "OK",
            onClick: ()=>{
                const selected = getAtom(selectedShapeAtom)
                const shapes = getAtom(shapeAtom)
                selected.forEach((s: Shape) => shapes.delete(s))
                setAtom(shapeAtom)(shapes)
                setAtom(selectedShapeAtom)(new SelectionSet())
                setAtom(hideConfirm)()
            }
        },
        {
            caption: captions.buttons.cancel,
            onClick: ()=>{
                setAtom(hideConfirm)()
            }
        }
        ]
    }

    setAtom(showConfirm)(dialog)
}