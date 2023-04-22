import { ViewPortState } from "../../../atoms/viewportAtoms";
import { Rectangle } from "../../../utils/geometry";
import Cursor from "./Cursor";

export default class SelectCursor extends Cursor {

    draw(ctx: CanvasRenderingContext2D, viewPortData: ViewPortState) {
        const {realRect, screenRect} = viewPortData
        this.refresh(realRect, screenRect);
        ctx.strokeStyle = this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth = 1//this.getStyle().getWidth();
        let size = 10;
        ctx.beginPath();
        ctx.moveTo(this.screenPoint.x - size + 0.5, this.screenPoint.y + 0.5);
        ctx.lineTo(this.screenPoint.x + size + 0.5, this.screenPoint.y + 0.5);
        ctx.moveTo(this.screenPoint.x + 0.5, this.screenPoint.y - size + 0.5);
        ctx.lineTo(this.screenPoint.x + 0.5, this.screenPoint.y + size + 0.5);
        ctx.stroke();
    }
}
