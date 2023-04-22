import { ViewPortState } from '../../atoms/viewportAtoms';
import { IShapeSelection, IShape, ShapeState } from '../../interfaces/ShapeInterface';
import { Point, TProperties } from '../../types/properties';
import { Rectangle } from '../../utils/geometry';
import { Color } from '../colors';
import ShapeStyle from './ShapeStyle';
export default class Shape implements IShape, IShapeSelection{
    state: ShapeState = {selectable: true, selected: false, highlighted: false}
    properties: Map<string, TProperties> = new Map()
    style: ShapeStyle = new ShapeStyle(Color.BLACK, ShapeStyle.SOLID)
    defaultStyle: ShapeStyle
    constructor(){
        this.defaultStyle = new ShapeStyle(this.style.getColor(), this.style.getStroke(), this.style.getWidth())
    }
    getProperties() {
        return this.properties
      }

    draw(ctx: CanvasRenderingContext2D, viewPortData: ViewPortState) {
        const {realRect, screenRect} = viewPortData
        this.refresh(realRect, screenRect);
        this.refreshStyle(ctx)
    }
    refresh(realRect: Rectangle, screenRect: Rectangle){};

    refreshStyle(ctx: CanvasRenderingContext2D) {
        this.setState(this.state)
        ctx.strokeStyle = this.getStyle().getColor();
        ctx.fillStyle = this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth = this.getStyle().getWidth();
    }
    getStyle(): ShapeStyle {
        return this.style;
    }

    setStyle(style: ShapeStyle) {
        this.style = style;
        this.defaultStyle = style;
    }

    onAddToSelection(){
        this.state.selected = true
      }
      
    onDeleteFromSelection(){
        this.state.selected = false
    }
    setState(state: ShapeState) {
        this.state = { ...this.state, ...state };
        if (this.state.selected === true) {
            this.setStyle(ShapeStyle.SELECTED_STYLE);
            
            return;
        } else {
            this.setStyle(this.defaultStyle);
            if (this.state.highlighted) this.setStyle(ShapeStyle.HIGHLIGHTED_STYLE)
        }
        if (this.state.highlighted) this.setStyle(ShapeStyle.HIGHLIGHTED_STYLE);
        if (this.state.error) this.setStyle(ShapeStyle.ERROR_STYLE);
    }
    getState() {
        return this.state;
    }
    getDistance(point: Point) {
        return 0
    }
    isUnderCursor(p: Point, pixelRatio: number){
        return false
    }
    isInSelectionRect({topLeft, bottomRight}: Rectangle): {cross: boolean, full: boolean} {
        return { cross: false, full: false };
    }
}