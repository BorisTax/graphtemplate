import Shape from "../components/shapes/Shape";
import { IHandler } from "../interfaces/HandlerInterface";
import { HandlerActions } from "./handlerAtoms";
import { ShapeActions } from "./shapeAtoms";

export const Actions = {
    addShape: (shape: Shape) => ({type: ShapeActions.ADD_SHAPE, payload: shape}),
    addShapeToSelection: (shape: Shape) => ({type: ShapeActions.ADD_SHAPE_TO_SELECTION, payload: shape}),
    setHandler: (handler: IHandler, prevHandler: IHandler) => ({type: HandlerActions.SET_HANDLER, payload: {handler, prevHandler}}),
    updateShapes: () => ({type: ShapeActions.UPDATE_SHAPES})
}