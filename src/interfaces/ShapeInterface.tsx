import ShapeStyle from "../components/shapes/ShapeStyle"
import { Point, TProperty, Rect } from "../types/properties"



export type ShapeState = {
    selected: boolean,
    highlighted: boolean,
    error?: boolean
}
export interface IShape {
    state: ShapeState
    properties: Map<string, TProperty<number|string|boolean|[]>>
    style: ShapeStyle
    getProperties: () => Map<string, TProperty<number|string|boolean|[]>>
    refreshStyle: (ctx: CanvasRenderingContext2D) => void
    refresh: (realRect: Rect, screenRect: Rect) => void
    draw: (ctx: CanvasRenderingContext2D, realRect: Rect, screenRect: Rect) => void
    getStyle: () => ShapeStyle
    setStyle: (style: ShapeStyle) => void
    setState: (state: ShapeState) => void
    isInSelectionRect: (rect: Rect) => {cross: boolean, full: boolean}
    getDistance: (point: Point) => number
}
export interface IShapeSelection {
    onAddToSelection: () => void
    onDeleteFromSelection: () => void
}