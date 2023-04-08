import { Getter, Setter } from "jotai";
import Shape from "../components/shapes/Shape";
import { IHandler } from "../interfaces/HandlerInterface";
import { HandlerActions } from "./handlerAtoms";
import { ShapeActions, shapeAtom } from "./shapeAtoms";
import { DialogActions } from "./dialogAtoms";

export const Actions = {
    addShape: (shape: Shape) => ({type: ShapeActions.ADD_SHAPE, payload: shape}),
    addShapeToSelection: (shape: Shape) => ({type: ShapeActions.ADD_SHAPE_TO_SELECTION, payload: shape}),
    cancel: () => ({type: HandlerActions.RESET_HANDLER}),
    deleteConfirm: () => ({type: DialogActions.DELETE_CONFIRM}),
    setHandler: (handler: IHandler, prevHandler: IHandler) => ({type: HandlerActions.SET_HANDLER, payload: {handler, prevHandler}}),
    setPrevHandler: () => ({type: HandlerActions.SET_PREV_HANDLER}),
    updateShapes: () => ({type: ShapeActions.UPDATE_SHAPES})
}

export function onCancel(get: Getter, set: Setter){
    const shapeState = get(shapeAtom)
    shapeState.selected.clear()
    set(shapeAtom, {...shapeState})
}