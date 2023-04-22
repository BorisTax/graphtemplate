import { ShapeAtomState } from '../atoms/shapeAtoms';
import { ViewPortState } from '../atoms/viewportAtoms';
import ShapeStyle from '../components/shapes/ShapeStyle';
import { IHandler } from '../interfaces/HandlerInterface';
import { isMobile } from '../reducers/functions';
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
    ctx.fillRect(0, 0, viewPortData.screenRect.width, viewPortData.screenRect.height);
    //ctx.strokeRect(0, 0, viewPortData.viewPortWidth-1, viewPortData.viewPortHeight-1);
    const { realRect, screenRect, marginRight, marginTop, marginLeft, marginBottom } = viewPortData;
    viewPortData.grid.draw(ctx, viewPortData)
    for (let shape of shapeState.shapes) {
        shape.draw(ctx, viewPortData);
    }
    let curShape = handler.curShape;
    if (curShape != null) curShape.draw(ctx, viewPortData);
    ctx.lineWidth = 1;
    ctx.setLineDash(ShapeStyle.SOLID);
    ctx.fillStyle = color;
    //fill margin
    ctx.fillRect(0, 0, screenRect.width - marginRight, marginTop);
    ctx.fillRect(0, 0, marginLeft, screenRect.height);
    ctx.fillRect(screenRect.width - marginRight, 0, screenRect.width, screenRect.height);
    ctx.fillRect(marginLeft, screenRect.height - marginBottom, screenRect.width - marginRight, screenRect.height - marginTop);
    ctx.strokeStyle = "black";
    ctx.strokeRect(marginLeft, marginTop, screenRect.width - marginRight - marginLeft, screenRect.height - marginBottom - marginTop);

    ctx.lineWidth = 1;
    if (!isMobile()) {
        handler.cursor.draw(ctx, viewPortData);
    }

}

