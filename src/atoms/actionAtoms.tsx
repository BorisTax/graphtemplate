import { atom } from "jotai";
import { SelectionSet, selectedShapeAtom } from "./shapeAtoms";

export const cancelAtom = atom(null ,(get, set, _) => {
    get(selectedShapeAtom).clear()
    set(selectedShapeAtom, new SelectionSet())
})