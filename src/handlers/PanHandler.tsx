import Geometry from "../utils/geometry";
import { MouseHandler } from "./MouseHandler";
import { getRealRect, getScreenRect, setCurCoord, setTopLeft } from "../functions/viewPortFunctions";
import { Point } from "../types/properties";
import { IHandler, TMouseProps, TTouchProps } from "../interfaces/HandlerInterface";
import { Actions } from "../atoms/actions";
export interface IPanHandler extends IHandler {
    startPoint: Point
}
export class PanHandler extends MouseHandler implements IPanHandler {
    startPoint = { x: 0, y: 0 }
    constructor(startPoint: Point) {
        super();
        this.startPoint = startPoint;
    }

    move(props: TMouseProps) {
        const { curPoint, viewPortData, setViewPortData } = props
        super.move(props);
        let dx = this.curPoint.x - this.startPoint.x;
        let dy = this.curPoint.y - this.startPoint.y;
        const realRect = getRealRect(viewPortData.topLeft, viewPortData.bottomRight)
        const screenRect = getScreenRect(viewPortData.viewPortWidth, viewPortData.viewPortHeight)
        const screenTopLeft = Geometry.realToScreen({ x: dx, y: viewPortData.maxPanHeight }, realRect, screenRect);
        const screenBottomRight = Geometry.realToScreen({ x: viewPortData.maxPanWidth + dx, y: 0 }, realRect, screenRect);
        const topLeft = { x: 0, y: 0 }
        const xInRange = ((screenTopLeft.x < viewPortData.viewPortWidth / 2) && (dx > 0)) || ((screenBottomRight.x > viewPortData.viewPortWidth / 2) && (dx < 0));
        const yInRange = ((screenTopLeft.y < viewPortData.viewPortHeight / 2) && (dy < 0)) || ((screenBottomRight.y > viewPortData.viewPortHeight / 2) && (dy > 0));
        topLeft.x = xInRange ? viewPortData.topLeft.x - dx : viewPortData.topLeft.x;
        topLeft.y = yInRange ? viewPortData.topLeft.y - dy : viewPortData.topLeft.y;
        setViewPortData(setTopLeft(topLeft, viewPortData))
        const cursorPoint = { x: xInRange ? this.startPoint.x : this.curPoint.x, y: yInRange ? this.startPoint.y : this.curPoint.y }
        setViewPortData(setCurCoord(cursorPoint, curPoint, viewPortData))

    }
    up(props: TMouseProps) {
        const { button, setHandler} = props
        if (button === 1 || button === 2) setHandler(Actions.setPrevHandler())
    }
    wheel() {

    }
    keypress(code: string) {
        return super.keypress(code)
    }
    leave(props: TMouseProps) {
        const { setHandler } = props
        super.leave(props);
        setHandler(Actions.setPrevHandler())
    }
    touchUp(props: TTouchProps) {
        const { setHandler } = props
        super.touchUp(props)
        setHandler(Actions.setPrevHandler())
    }
    touchMove(props: TTouchProps) {
        this.move({...props, button: 0, keys: {shiftKey: false, ctrlKey: false, altKey: false}})
    }

}
