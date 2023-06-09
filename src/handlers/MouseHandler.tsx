import Geometry from "../utils/geometry";
import { scale } from "../functions/viewPortFunctions";
import { IHandler, TMouseProps, TStatusBar, TTouchProps, TWheelProps } from "../interfaces/HandlerInterface";
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
    screenPoint: Point = { x: 0, y: 0 }
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
    click(props: TMouseProps) {
        const { curPoint, viewPortData } = props
        this.clickCount++;
        this.curPoint = Geometry.screenToReal(curPoint, viewPortData.screenRect.width, viewPortData.screenRect.height, viewPortData.realRect.topLeft, viewPortData.realRect.bottomRight);
        this.prevPoint = { ...this.curPoint }
    }
    doubleClick(props: TMouseProps) {
        const { curPoint, viewPortData } = props
        this.curPoint = Geometry.screenToReal(curPoint, viewPortData.screenRect.width, viewPortData.screenRect.height, viewPortData.realRect.topLeft, viewPortData.realRect.bottomRight);
    }
    isOutRect(p: Point, viewPortData: ViewPortState) {
        return p.x < viewPortData.marginLeft || p.x > viewPortData.screenRect.width - viewPortData.marginRight
            || p.y < viewPortData.marginTop || p.y > viewPortData.screenRect.height - viewPortData.marginBottom;
    }
    move(props: TMouseProps) {
        const { curPoint, viewPortData } = props
        this.screenPoint = curPoint
        this.curPoint.x = Math.trunc(this.curPoint.x);
        this.curPoint.y = Math.trunc(this.curPoint.y);
        this.curPoint = Geometry.screenToReal(curPoint, viewPortData.screenRect.width, viewPortData.screenRect.height, viewPortData.realRect.topLeft, viewPortData.realRect.bottomRight);
        this.prevPoint = { ...this.curPoint }
        this.cursor.setPosition(this.curPoint)
        if (!this.mouseOnScreen(viewPortData)) {
            this.curPoint.x = this.prevPoint.x;
            this.curPoint.y = this.prevPoint.y;
        }
    }
    mouseOnScreen(viewPortData: ViewPortState) {
        return !this.isOutRect(this.screenPoint, viewPortData);
    }
    down(props: TMouseProps) {
        const { curPoint, viewPortData } = props
        this.curPoint = Geometry.screenToReal(curPoint, viewPortData.screenRect.width, viewPortData.screenRect.height, viewPortData.realRect.topLeft, viewPortData.realRect.bottomRight);
    }
    up(props: TMouseProps) { }
    leave(props: TMouseProps) {

    }
    wheel(props: TWheelProps) {
        const { deltaY = 0, curPoint, viewPortData, setViewPortData } = props
        let point = Geometry.screenToReal(curPoint, viewPortData.screenRect.width, viewPortData.screenRect.height, viewPortData.realRect.topLeft, viewPortData.realRect.bottomRight);
        if ((deltaY > 0) && (viewPortData.realRect.width <= 9000)) setViewPortData(scale(1.2, point, viewPortData))
        if ((deltaY < 0) && (viewPortData.pixelRatio >= 0.001)) setViewPortData(scale(1 / 1.2, point, viewPortData));
    }
    touchDown(props: TTouchProps) {
        const { pointerId, curPoint, viewPortData } = props
        viewPortData.touchManager.addTouchEvent({ pointerId, curPoint })
        //this.touchEvents.push({pointerId, curPoint})

    }
    touchMove(props: TTouchProps) {
        const { pointerId, curPoint, viewPortData } = props
        viewPortData.touchManager.setPoint(pointerId, curPoint)
        this.curPoint = Geometry.screenToReal(curPoint, viewPortData.screenRect.width, viewPortData.screenRect.height, viewPortData.realRect.topLeft, viewPortData.realRect.bottomRight);
    }

    touchUp(props: TTouchProps) {
        const { pointerId, viewPortData } = props
        viewPortData.touchManager.removeTouchEvent(pointerId)

    }
}