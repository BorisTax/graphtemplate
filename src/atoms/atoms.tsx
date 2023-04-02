import { Atom, WritableAtom } from "jotai"

export type getAtomFunc = (a: Atom<any>) => any
export type setAtomFunc = (a: WritableAtom<any, any, any>) => any