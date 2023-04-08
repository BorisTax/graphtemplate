import { Getter, Setter, atom } from "jotai";
import { AtomAction } from "./atoms";
import { SelectionSet, ShapeSet } from "../classes/shapeSet";
export type ShapeAtomState = {
    shapes: ShapeSet,
    selected: SelectionSet
}
export const ShapeActions = {
  ADD_SHAPE: "ADD_SHAPE",
  ADD_SHAPE_TO_SELECTION: "ADD_SHAPE_TO_SELECTION",
  UPDATE_SHAPES: "UPDATE_SHAPES"
}

export const shapeAtom = atom<ShapeAtomState>(getInitialState())

export const setShapeAtom = atom(null, (get, set, action: AtomAction) => {set(shapeAtom, shapeReducer(action, get, set))})

function getInitialState(){
    return {
        shapes: new ShapeSet(),
        selected: new SelectionSet()
    }
}

function shapeReducer(action: AtomAction, get: Getter, set: Setter): ShapeAtomState{
  const state = get(shapeAtom)
  switch(action.type){
    case ShapeActions.ADD_SHAPE:
      state.shapes.add(action.payload);
      return {...state, shapes: new ShapeSet(state.shapes)}
    case ShapeActions.ADD_SHAPE_TO_SELECTION:
      state.selected.add(action.payload);
      return {...state, selected: new SelectionSet(state.selected)}
    case ShapeActions.UPDATE_SHAPES:
      return {...state}
    default:
      return state
  }
}
