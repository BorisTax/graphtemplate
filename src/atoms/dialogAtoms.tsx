import { Getter, Setter, WritableAtom, atom } from 'jotai'
import { shapeAtom } from './shapeAtoms'
import Shape from '../components/shapes/Shape'
import { AtomAction } from './atoms'
import { captionsAtom } from './languageAtoms'
export type DialogAction = {
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
    actions: DialogAction[]
}
export type CustomDialog = {
    show: boolean,
    dialog: React.FunctionComponent | null
}
export type DialogState = {
    alert: AlertDialog,
    confirm: ConfirmDialog,
    custom: CustomDialog
}
export const DialogActions = {
    DELETE_CONFIRM: "DELETE_CONFIRM",
    SHOW_ALERT: "SHOW_ALERT",
    SHOW_CONFIRM: "SHOW_CONFIRM",
    SHOW_CUSTOM: "SHOW_CUSTOM"
  }
const getInitialState = (): DialogState => ({
    alert: {show: false, message: ""},
    confirm: {show: false, message: "", actions: []},
    custom: {show: false, dialog: null}
})

export const dialogAtom = atom<DialogState>(getInitialState())
export const setDialogAtom = atom(null, (get, set, action: AtomAction) => {set(dialogAtom, dialogReducer(action, get, set))})

function dialogReducer(action: AtomAction, get: Getter, set: Setter){
    const state = get(dialogAtom)
    const captions = get(captionsAtom)
    switch(action.type){
        case DialogActions.DELETE_CONFIRM:
            return {...state, confirm: {
                show: true,
                message: captions.messages.delete,
                actions: [
                    {
                    caption: "OK",
                    onClick: ()=>{
                        const selected = get(shapeAtom).selected
                        const shapes = get(shapeAtom).shapes
                        selected.forEach((s: Shape) => shapes.delete(s))
                        set(shapeAtom, {shapes, selected})
                        set(dialogAtom, {...state, confirm: {show: false, message: "", actions: []}})
                    }
                },
                {
                    caption: captions.buttons.cancel,
                    onClick: ()=>{
                        set(dialogAtom, {...state, confirm: {show: false, message: "", actions: []}})
                    }
                }
                ]
            }}
        case DialogActions.SHOW_ALERT:
            return {...state, alert: {
                show: action.payload.show,
                message: action.payload
            }}
        case DialogActions.SHOW_CONFIRM:
            return {...state, confirm: {
                show: action.payload.show,
                message: action.payload.message,
                actions: action.payload.actions
            }}
        case DialogActions.SHOW_CUSTOM:
            return {...state, custom: {
                show: action.payload.show,
                dialog: action.payload.dialog
            }}
        default:
            return state
    }
}


