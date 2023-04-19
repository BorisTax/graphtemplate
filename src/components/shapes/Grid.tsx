import { ViewPortState } from '../../atoms/viewportAtoms';
import { ShapeState } from '../../interfaces/ShapeInterface';
import Geometry, { Rectangle, SLine } from '../../utils/geometry';
import { Color } from '../colors';
import Shape from './Shape';
import ShapeStyle from './ShapeStyle';
import SLineShape from './geometry/SLineShape';

type GridNumbers = { gridPointsX: number[], gridPointsY: number[], gridNumbersX: number[], gridNumbersY: number[] }

export default class Grid extends Shape {
    state: ShapeState = { selectable: false, selected: false, highlighted: false }
    properties = new Map()
    style: ShapeStyle = new ShapeStyle(Color.GRAY, ShapeStyle.DASH)
    xAxe: SLineShape = new SLineShape(new SLine(1, 0, 0))
    yAxe: SLineShape = new SLineShape(new SLine(0, 1, 0))
    constructor() {
        super()
        this.xAxe.setStyle(new ShapeStyle(Color.RED, ShapeStyle.SOLID, 1))
        this.yAxe.setStyle(new ShapeStyle(Color.RED, ShapeStyle.SOLID, 1))
    }
    draw(ctx: CanvasRenderingContext2D, realRect: Rectangle, screenRect: Rectangle, viewPortData?: ViewPortState) {
        this.refresh(realRect, screenRect);
        this.refreshStyle(ctx)
        this.drawGrid(ctx, realRect, screenRect, viewPortData as ViewPortState)
        this.xAxe.draw(ctx, realRect, screenRect)
        this.yAxe.draw(ctx, realRect, screenRect)
    }
    refresh(realRect: Rectangle, screenRect: Rectangle) { };

    refreshStyle(ctx: CanvasRenderingContext2D) {
        this.setState(this.state)
        ctx.strokeStyle = this.getStyle().getColor();
        ctx.fillStyle = this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth = this.getStyle().getWidth();
    }

    drawGrid(ctx: CanvasRenderingContext2D, realRect: Rectangle, screenRect: Rectangle, viewPortData: ViewPortState) {
        const { topLeft, width: realWidth, height: realHeight } = realRect
        ctx.strokeStyle = Color.GRID;
        let solidStyle = new ShapeStyle(Color.GRAY, ShapeStyle.SOLID);
        let dashStyle = new ShapeStyle(Color.GRAY, ShapeStyle.DASH);
        let firstX = Math.round(topLeft.x / viewPortData.gridStep) * viewPortData.gridStep;
        let firstY = Math.round(topLeft.y / viewPortData.gridStep) * viewPortData.gridStep;
        let hor = false;
        let vert = false;
        let ix = 0;
        let iy = 0;
        let xGridLineNumber = Math.round(firstX / viewPortData.gridStep);
        let yGridLineNumber = Math.round(firstY / viewPortData.gridStep);
        let gridLinesCountX = Math.round(realWidth / viewPortData.gridStep);
        let gridLinesCountY = Math.round(realHeight / viewPortData.gridStep);
        const gridPointsX = new Array(gridLinesCountX);
        const gridPointsY = new Array(gridLinesCountY);
        const gridNumbersX = new Array(gridLinesCountX);
        const gridNumbersY = new Array(gridLinesCountY);
        while (!hor || !vert) {
            if (!hor) {
                let x = firstX + viewPortData.gridStep * ix;
                let px = Geometry.realToScreen({ x, y: topLeft.y }, realRect, screenRect);
                if (xGridLineNumber % 10 === 0) ctx.setLineDash(solidStyle.getStroke()); else ctx.setLineDash(dashStyle.getStroke());
                ctx.beginPath();
                ctx.moveTo(px.x + 0.5, 0 + 0.5);
                ctx.lineTo(px.x + 0.5, screenRect.height + 0.5);
                ctx.stroke();
                gridPointsX[ix] = px.x;
                gridNumbersX[ix] = x;
                ix++;
                xGridLineNumber++;
                if (x > (topLeft.x + realWidth)) hor = true;
            }
            if (!vert) {
                let y = firstY - viewPortData.gridStep * iy;
                let py = Geometry.realToScreen({ x: topLeft.x, y }, realRect, screenRect);
                if (yGridLineNumber % 10 === 0) ctx.setLineDash(solidStyle.getStroke()); else ctx.setLineDash(dashStyle.getStroke());
                yGridLineNumber--;
                ctx.beginPath();
                ctx.moveTo(0 + 0.5, py.y + 0.5);
                ctx.lineTo(screenRect.width + 0.5, py.y + 0.5);
                ctx.stroke();
                gridPointsY[iy] = py.y;
                gridNumbersY[iy] = y;
                iy++;
                if (y < (topLeft.y - realHeight)) vert = true;
            }

        }
        ctx.setLineDash(solidStyle.getStroke());
        return { gridPointsX, gridPointsY, gridNumbersX, gridNumbersY }
    }
    drawCoordinates(ctx: CanvasRenderingContext2D, realRect: Rectangle, screenRect: Rectangle, viewPortData: ViewPortState, { gridPointsX, gridPointsY, gridNumbersX, gridNumbersY }: GridNumbers) {
        ctx.font = "10px sans-serif";
        ctx.strokeStyle = "black";
        let i = 0;
        let format = 0;
        let w;
        if (viewPortData.gridStep >= 0.001) { format = 3; }
        if (viewPortData.gridStep >= 0.01) { format = 2; }
        if (viewPortData.gridStep >= 0.1) { format = 1; }
        if (viewPortData.gridStep >= 1) { format = 0; }
        let l = 0;
        let s0 = "";//Finding out the number with maximum length
        for (let x of gridNumbersX) {
            if (x === null) continue;
            let s = x.toFixed(format);
            if (l < s.length) { s0 = s; l = s.length; }
        }
        w = ctx.measureText(s0).width;
        for (let x of gridPointsX) {
            if (x === null) continue;
            if (x > 0 && x < screenRect.width) {
                let s = gridNumbersX[i].toFixed(format);
                let d = 1;
                let r = w / viewPortData.gridStepPixels;
                if (r >= 1) d = 2;
                if (r >= 1.5) d = 5;
                if (Math.round(gridNumbersX[i] / viewPortData.gridStep) % d === 0)
                    ctx.strokeText(s, x - ctx.measureText(s).width / 2, - 5);
            }
            i++;
        }
        i = 0;
        for (let y of gridPointsY) {
            if (y === null) continue;
            if (y > 0 && y < screenRect.height) {
                let s = gridNumbersY[i].toFixed(format);
                w = ctx.measureText(s).width;
                let h = ctx.measureText("12").width;
                let d = 1;
                let r = h / viewPortData.gridStepPixels;
                if (r > 0.8 && r < 1.5) d = 2;
                if (r >= 1.5) d = 5;
                if (Math.round(gridNumbersY[i] / viewPortData.gridStep) % d === 0)
                    ctx.strokeText(s, - w, y + h / 3);
            }
            i++;
        }
    }

}