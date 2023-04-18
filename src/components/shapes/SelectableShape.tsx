import { IShapeSelection, IShape, ShapeState } from '../../interfaces/ShapeInterface';
import { Point } from '../../types/properties';
import { Rectangle } from '../../utils/geometry';
import { Color } from '../colors';
import Shape from './Shape';
import ShapeStyle from './ShapeStyle';
export default class SelectableShape extends Shape implements IShapeSelection{
    state: ShapeState = {selectable: true, selected: false, highlighted: false}
    properties = new Map()
    style: ShapeStyle = new ShapeStyle(Color.BLACK, ShapeStyle.SOLID)
    
    getProperties() {
        return this.properties
      }

    draw(ctx: CanvasRenderingContext2D, realRect: Rectangle, screenRect: Rectangle) {
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
    isUnderCursor(p: Point, pixelRatio: number){
        return false
    }
    isInSelectionRect({topLeft, bottomRight}: Rectangle): {cross: boolean, full: boolean} {
        return { cross: false, full: false };
    }
}