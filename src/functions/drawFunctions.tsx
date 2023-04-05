import { ShapeAtomState } from '../atoms/shapeAtoms';
import { ViewPortState } from '../atoms/viewportAtoms';
import ShapeStyle from '../components/shapes/ShapeStyle';
import { IHandler } from '../interfaces/HandlerInterface';
import { isMobile } from '../reducers/functions';
import { Rect } from '../types/properties';
import { getRealRect, getScreenRect } from './viewPortFunctions'
export type PaintProps = {
    viewPortData: ViewPortState,
    shapeState: ShapeAtomState,
    handler: IHandler
}
export function paint(ctx: CanvasRenderingContext2D, props: PaintProps) {
    const {viewPortData, shapeState, handler} = props
    const color = "white"
    ctx.fillStyle = color;
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = "black"
    ctx.fillRect(0, 0, viewPortData.viewPortWidth, viewPortData.viewPortHeight);
    //ctx.strokeRect(0, 0, viewPortData.viewPortWidth-1, viewPortData.viewPortHeight-1);
    const { topLeft, bottomRight, viewPortWidth, viewPortHeight, marginRight, marginTop, marginLeft, marginBottom } = viewPortData;
    const realRect: Rect = getRealRect(topLeft, bottomRight)
    const screenRect: Rect = getScreenRect(viewPortWidth, viewPortHeight)
    for (let shape of shapeState.shapes) {
        shape.draw(ctx, realRect, screenRect);
    }
    let curShape = handler.curShape;
    if (curShape != null) curShape.draw(ctx, realRect, screenRect);
    ctx.lineWidth = 1;
    ctx.setLineDash(ShapeStyle.SOLID);
    ctx.fillStyle = color;
    //fill margin
    ctx.fillRect(0, 0, viewPortWidth - marginRight, marginTop);
    ctx.fillRect(0, 0, marginLeft, viewPortHeight);
    ctx.fillRect(viewPortWidth - marginRight, 0, viewPortWidth, viewPortHeight);
    ctx.fillRect(marginLeft, viewPortHeight - marginBottom, viewPortWidth - marginRight, viewPortHeight - marginTop);
    ctx.strokeStyle = "black";
    ctx.strokeRect(marginLeft, marginTop, viewPortWidth - marginRight - marginLeft, viewPortHeight - marginBottom - marginTop);

    ctx.lineWidth = 1;
    if (isMobile() && handler.mouseOnScreen(viewPortData)) {
        handler.cursor.setPosition(viewPortData.curRealPoint);
        handler.cursor.draw(ctx, realRect, screenRect);
    }

}

