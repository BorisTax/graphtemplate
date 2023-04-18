import {  ShapeState } from '../../interfaces/ShapeInterface';
import { Rectangle, SLine } from '../../utils/geometry';
import { Color } from '../colors';
import Shape from './Shape';
import ShapeStyle from './ShapeStyle';
import SLineShape from './geometry/SLineShape';
export default class Grid extends Shape{
    state: ShapeState = {selectable: false, selected: false, highlighted: false}
    properties = new Map()
    style: ShapeStyle = new ShapeStyle(Color.GRAY, ShapeStyle.DASH)
    xAxe: SLineShape = new SLineShape(new SLine(1, 0, 0))
    yAxe: SLineShape = new SLineShape(new SLine(0, 1, 0))
    constructor(){
        super()
        this.xAxe.setStyle(new ShapeStyle(Color.RED, ShapeStyle.SOLID, 1))
        this.yAxe.setStyle(new ShapeStyle(Color.RED, ShapeStyle.SOLID, 1))
    }
    draw(ctx: CanvasRenderingContext2D, realRect: Rectangle, screenRect: Rectangle) {
        this.refresh(realRect, screenRect);
        this.refreshStyle(ctx)
        this.xAxe.draw(ctx, realRect, screenRect)
        this.yAxe.draw(ctx, realRect, screenRect)
    }
    refresh(realRect: Rectangle, screenRect: Rectangle){};

    refreshStyle(ctx: CanvasRenderingContext2D) {
        this.setState(this.state)
        ctx.strokeStyle = this.getStyle().getColor();
        ctx.fillStyle = this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth = this.getStyle().getWidth();
    }

}