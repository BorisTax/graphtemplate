import Geometry from "../utils/geometry";
import { scale } from "../functions/viewPortFunctions";
import { IHandler, THandlerProps, TStatusBar } from "../interfaces/HandlerInterface";
import Shape from "../components/shapes/Shape";
import { Point } from "../types/properties";
import { ViewPortState } from "../atoms/viewportAtoms";
import Cursor from "../components/shapes/cursors/Cursor";
import SelectCursor from "../components/shapes/cursors/SelectCursor";
export class MouseHandler implements IHandler {
    static MBUTTON_LEFT = 0
    static MBUTTON_MIDDLE = 1
    static MBUTTON_RIGHT = 2
    isMobile = false
    clickCount: number = 0
    curShape: Shape | null = null
    curPoint: Point = { x: 0, y: 0 }
    prevPoint: Point = { x: 0, y: 0 }
    statusBar: TStatusBar = [{ text: "", icons: [""] }];
    cursor: Cursor = new SelectCursor({ x: 0, y: 0 })
    constructor() {
        this.clickCount = 0;
        this.curShape = null;
        this.statusBar = [];
    }

    keypress(code: string) {
        if (code === "Space") {
            return true;
        }
        return false
    }
    click(props: THandlerProps) {
        const { curPoint, viewPortData } = props
        this.clickCount++;
        this.curPoint = Geometry.screenToReal(curPoint.x, curPoint.y, viewPortData.viewPortWidth, viewPortData.viewPortHeight, viewPortData.topLeft, viewPortData.bottomRight);
        this.prevPoint = { ...this.curPoint }
    }
    doubleClick(props: THandlerProps) {
        const { curPoint, viewPortData } = props
        this.curPoint = Geometry.screenToReal(curPoint.x, curPoint.y, viewPortData.viewPortWidth, viewPortData.viewPortHeight, viewPortData.topLeft, viewPortData.bottomRight);
    }
    isOutRect(p: Point, viewPortData: ViewPortState) {
        return p.x < viewPortData.marginLeft || p.x > viewPortData.viewPortWidth - viewPortData.marginRight
            || p.y < viewPortData.marginTop || p.y > viewPortData.viewPortHeight - viewPortData.marginBottom;
    }
    move(props: THandlerProps) {
        const { curPoint, viewPortData } = props
        this.prevPoint = { ...this.curPoint }

        this.curPoint = Geometry.screenToReal(curPoint.x, curPoint.y, viewPortData.viewPortWidth, viewPortData.viewPortHeight, viewPortData.topLeft, viewPortData.bottomRight);
        this.curPoint.x = Math.trunc(this.curPoint.x);
        this.curPoint.y = Math.trunc(this.curPoint.y);
        if (!this.mouseOnScreen(viewPortData)) {
            this.curPoint.x = this.prevPoint.x;
            this.curPoint.y = this.prevPoint.y;
        }
    }
    mouseOnScreen(viewPortData: ViewPortState) {
        return !this.isOutRect(this.curPoint, viewPortData);
    }
    down(props: THandlerProps) {
        const { curPoint, viewPortData } = props
        this.curPoint = Geometry.screenToReal(curPoint.x, curPoint.y, viewPortData.viewPortWidth, viewPortData.viewPortHeight, viewPortData.topLeft, viewPortData.bottomRight);
    }
    up(props: THandlerProps) { }
    leave(props: THandlerProps) {

    }
    wheel(props: THandlerProps) {
        const { deltaY = 0, curPoint, viewPortData, setViewPortData, keys } = props
        let point = Geometry.screenToReal(curPoint.x, curPoint.y, viewPortData.viewPortWidth, viewPortData.viewPortHeight, viewPortData.topLeft, viewPortData.bottomRight);
        if ((deltaY > 0) && (viewPortData.realWidth <= 9000)) setViewPortData(prevData => scale(1.2, point, prevData))
        if ((deltaY < 0) && (viewPortData.pixelRatio >= 0.001)) setViewPortData(prevData => scale(1 / 1.2, point, prevData));
    }
    touchDown(props: THandlerProps) {
        const { pointerId, curPoint, viewPortData } = props
        viewPortData.touchManager.addTouchEvent({ pointerId, curPoint })
        //this.touchEvents.push({pointerId, curPoint})

    }
    touchMove(props: THandlerProps) {
        const { pointerId, curPoint, viewPortData } = props
        viewPortData.touchManager.setPoint(pointerId, curPoint)
        this.curPoint = Geometry.screenToReal(curPoint.x, curPoint.y, viewPortData.viewPortWidth, viewPortData.viewPortHeight, viewPortData.topLeft, viewPortData.bottomRight);
    }

    touchUp(props: THandlerProps) {
        const { pointerId, viewPortData } = props
        viewPortData.touchManager.removeTouchEvent(pointerId)

    }
}