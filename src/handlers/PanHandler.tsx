import Geometry from "../utils/geometry";
import { MouseHandler } from "./MouseHandler";
import { getRealRect, getScreenRect, setCurCoord, setTopLeft } from "../functions/viewPortFunctions";
import { Point } from "../types/properties";
import { IHandler, THandlerProps } from "../interfaces/HandlerInterface";
import { setPrevHandler } from "../atoms/handlerAtoms";
export interface IPanHandler extends IHandler {
    startPoint: Point
}
export class PanHandler extends MouseHandler implements IPanHandler {
    startPoint = { x: 0, y: 0 }
    constructor(startPoint: Point) {
        super();
        this.startPoint = startPoint;
    }

    move(props: THandlerProps) {
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
        setViewPortData(prevData => setTopLeft(topLeft, prevData))
        const cursorPoint = { x: xInRange ? this.startPoint.x : this.curPoint.x, y: yInRange ? this.startPoint.y : this.curPoint.y }
        setViewPortData(prevData => setCurCoord(cursorPoint, curPoint, prevData))

    }
    up(props: THandlerProps) {
        const { button, setAtom } = props
        if (button === 1 || button === 2) setAtom(setPrevHandler)()
    }
    wheel() {

    }
    keypress(code: string) {
        return super.keypress(code)
    }
    leave(props: THandlerProps) {
        const { setAtom } = props
        super.leave(props);
        setAtom(setPrevHandler)()
    }
    touchUp(props: THandlerProps) {
        const { setAtom } = props
        super.touchUp(props)
        setAtom(setPrevHandler)()
    }
    touchMove(props: THandlerProps) {
        this.move(props)
    }

}
