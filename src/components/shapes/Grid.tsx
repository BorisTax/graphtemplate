import { IShapeSelection, IShape, ShapeState } from '../../interfaces/ShapeInterface';
import { Point, Rect } from '../../types/properties';
import { Color } from '../colors';
import Shape from './Shape';
import ShapeStyle from './ShapeStyle';
export default class Grid extends Shape{
    state: ShapeState = {selectable: false, selected: false, highlighted: false}
    properties = new Map()
    style: ShapeStyle = new ShapeStyle(Color.BLACK, ShapeStyle.SOLID)

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

}