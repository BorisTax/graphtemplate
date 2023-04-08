import { Getter, Setter, atom } from "jotai";
import { MouseHandler } from "../handlers/MouseHandler";
import { SelectHandler } from "../handlers/SelectHandler";
import { AtomAction } from "./atoms";
import { onCancel } from "./actions";

export const HandlerActions = {
    RESET_HANDLER: "RESET_HANDLER",
    SET_HANDLER: "SET_HANDLER",
    SET_PREV_HANDLER: "SET_PREV_HANDLER",
}

export const handlerAtom = atom<MouseHandler>(new SelectHandler())
export const prevHandlerAtom = atom<MouseHandler>(new SelectHandler())
export const setHandlerAtom = atom(null, (get, set, action: AtomAction) => {set(handlerAtom, handlerReducer(action, get, set))})
export const setPrevHandlerAtom = atom(null, (get, set, _) => {set(handlerAtom, get(prevHandlerAtom))})

function handlerReducer(action: AtomAction, get: Getter, set: Setter){
    const handler = get(handlerAtom)
    const prevHandler = get(prevHandlerAtom)
    switch(action.type){
        case HandlerActions.RESET_HANDLER:
            onCancel(get, set)
            return new SelectHandler()
        case HandlerActions.SET_HANDLER:
            set(prevHandlerAtom, action.payload.prevHandler)
            return action.payload.handler
        case HandlerActions.SET_PREV_HANDLER:
            return prevHandler
        default:
            return handler
    }
}