import { Atom, Getter, Setter, WritableAtom } from "jotai"

export type AtomAction = {
    type: string,
    payload?: any
}
export type SetAtomFunc = (action: AtomAction) => void
export type AtomReducer = (action: AtomAction, get: Getter, set: Setter) => any