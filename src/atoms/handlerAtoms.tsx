import { Getter, Setter, atom } from "jotai";
import { MouseHandler } from "../handlers/MouseHandler";
import { SelectHandler } from "../handlers/SelectHandler";
import { AtomAction } from "./atoms";

export const HandlerActions = {
    SET_HANDLER: "SET_HANDLER",
    SET_PREV_HANDLER: "SET_PREV_HANDLER",
}

export const handlerAtom = atom<MouseHandler>(new SelectHandler())
export const prevHandlerAtom = atom<MouseHandler>(new SelectHandler())
export const setHandlerAtom = atom(null, (get, set, action: AtomAction) => {set(prevHandlerAtom, action.payload.prevHandler); set(handlerAtom, handlerReducer(action, get, set))})
export const setPrevHandlerAtom = atom(null, (get, set, _) => {set(handlerAtom, get(prevHandlerAtom))})

function handlerReducer(action: AtomAction, get: Getter, set: Setter){
    const state = get(handlerAtom)
    switch(action.type){
        case HandlerActions.SET_HANDLER:
            return action.payload
        default:
            return state
    }
}