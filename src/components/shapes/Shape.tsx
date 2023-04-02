import { IShapeSelection, IShape, ShapeState } from '../../interfaces/ShapeInterface';
import { Point, Rect } from '../../types/properties';
import { Color } from '../colors';
import ShapeStyle from './ShapeStyle';
export default class Shape implements IShape, IShapeSelection{
    state: ShapeState = {selected: false, highlighted: false}
    properties = new Map()
    style: ShapeStyle = new ShapeStyle(Color.BLACK, ShapeStyle.SOLID)
    constructor(){
    }

    getProperties() {
        return this.properties
      }

    draw(ctx: CanvasRenderingContext2D, realRect: Rect, screenRect: Rect) {
        this.refresh(realRect, screenRect);
        this.refreshStyle(ctx)
    }
    refresh(realRect: Rect, screenRect: Rect){};

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
            this.setStyle(ShapeStyle.DEFAULT_STYLE);
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
    
    isInSelectionRect({topLeft, bottomRight}: Rect): {cross: boolean, full: boolean} {
        return { cross: false, full: false };
    }
}