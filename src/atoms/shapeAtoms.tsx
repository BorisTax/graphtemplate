import { atom } from "jotai";
import Shape from "../components/shapes/Shape";
export type ShapeState = {
    shapes: ShapeSet,
    selected: SelectionSet
}
export const shapeAtom = atom<ShapeSet>(getInitialState().shapes)
export const selectedShapeAtom = atom<SelectionSet>(getInitialState().selected)
export const addShape = atom(null, (get, set, shape: Shape) => {get(shapeAtom).add(shape); set(shapeAtom, new ShapeSet(get(shapeAtom)))})
export const addShapeToSelection = atom(null, (get, set, shape: Shape) => {get(selectedShapeAtom).add(shape); set(shapeAtom, new SelectionSet(get(shapeAtom)))})
export const updateShapes = atom(null, (get, set, _) => {set(shapeAtom, new ShapeSet(get(shapeAtom))); set(selectedShapeAtom, new SelectionSet(get(selectedShapeAtom)))})

function getInitialState(){
    return {
        shapes: new ShapeSet(),
        selected: new SelectionSet()
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