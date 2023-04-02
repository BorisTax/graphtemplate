import { atom } from "jotai";
import { MouseHandler } from "../handlers/MouseHandler";
import { SelectHandler } from "../handlers/SelectHandler";

export const handlerAtom = atom<MouseHandler>(new SelectHandler())
export const prevHandlerAtom = atom<MouseHandler>(new SelectHandler())
export const setHandler = atom(null, (get, set, {handler, prevHandler}) => {set(prevHandlerAtom, prevHandler); set(handlerAtom, handler)})
export const setPrevHandler = atom(null, (get, set, _) => {set(handlerAtom, get(prevHandlerAtom))})