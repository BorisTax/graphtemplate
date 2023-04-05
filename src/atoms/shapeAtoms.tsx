import { Getter, Setter, atom } from "jotai";
import Shape from "../components/shapes/Shape";
import { AtomAction } from "./atoms";
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

export class ShapeSet extends Set<Shape>{
    add(item: Shape){
        const res = super.add(item)
        return res 
      }
    delete(item: Shape){
    const res = super.delete(item)
    return res
    }
    has(item: Shape){
    return super.has(item)
    }
    clear(){
    return super.clear()
    }
}

export class SelectionSet extends Set<Shape>{
    add(item: Shape){
      const res = super.add(item)
      if(item.onAddToSelection) item.onAddToSelection()
      return res 
    }
    delete(item: Shape){
      const res = super.delete(item)
      if(item.onDeleteFromSelection) item.onDeleteFromSelection()
      return res
    }
    has(item: Shape){
      return super.has(item)
    }
    clear(){
      for(let p of this) if(p.onDeleteFromSelection) p.onDeleteFromSelection()
      return super.clear()
    }
}