import { ViewPortState } from "../atoms/viewportAtoms"
import ShapeStyle from "../components/shapes/ShapeStyle"
import { Point, TProperty, TProperties } from "../types/properties"
import { Rectangle } from "../utils/geometry"

export type ShapeState = {
    selected?: boolean,
    selectable?: boolean,
    highlighted?: boolean,
    error?: boolean
}
export interface IShape {
    state: ShapeState
    properties: Map<string, TProperties>
    style: ShapeStyle
    getProperties: () => Map<string, TProperties>
    refreshStyle: (ctx: CanvasRenderingContext2D) => void
    refresh: (realRect: Rectangle, screenRect: Rectangle) => void
    draw: (ctx: CanvasRenderingContext2D, viewPortData: ViewPortState) => void
    getStyle: () => ShapeStyle
    setStyle: (style: ShapeStyle) => void
    setState: (state: ShapeState) => void
}
export interface IShapeSelection {
    isUnderCursor: (p: Point, pixelRatio: number) => boolean
    isInSelectionRect: (rect: Rectangle) => {cross: boolean, full: boolean}
    onAddToSelection: () => void
    onDeleteFromSelection: () => void
}