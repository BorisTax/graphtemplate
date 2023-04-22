import { ViewPortState } from "../../../atoms/viewportAtoms";
import { TAddKeys } from "../../../handlers/keyHandlers/options";
import { Point } from "../../../types/properties";
import Geometry, { Rectangle } from "../../../utils/geometry";
import { Color } from "../../colors";
import ShapeStyle from "../ShapeStyle";
export interface ICursor {
    point: Point
    screenPoint: Point
    keys: TAddKeys
    style: ShapeStyle
    refresh: (realRect: Rectangle, screenRect: Rectangle) => void
    draw: (ctx: CanvasRenderingContext2D, viewPortData: ViewPortState) => void
    setPosition: (point: Point) => void
    setAdditional: (keys: TAddKeys) => void
}

export default class Cursor implements ICursor{
    point: Point = {x: 0, y: 0}
    screenPoint: Point = {x: 0, y: 0}
    keys = {}
    style: ShapeStyle = new ShapeStyle(Color.BLACK, ShapeStyle.SOLID)
    constructor(point: Point){
        this.point = point;
    }

    draw(ctx: CanvasRenderingContext2D, viewPortData: ViewPortState){

    }

    refresh(realRect: Rectangle,  screenRect: Rectangle){
        this.screenPoint = Geometry.realToScreen(this.point,realRect,screenRect);
    }

    setPosition(point: Point) {
        this.point = point;
    }

    setAdditional(keys: TAddKeys){
        this.keys = {...keys};
    }

    getStyle(): ShapeStyle {
        return this.style;
    }

    setStyle(style: ShapeStyle) {
        this.style = style;

    }
}
