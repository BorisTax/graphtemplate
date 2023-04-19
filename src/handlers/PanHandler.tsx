import { MouseHandler } from "./MouseHandler";
import { setCurCoord, setTopLeft } from "../functions/viewPortFunctions";
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
        const topLeft = { x: 0, y: 0 }
        topLeft.x = viewPortData.topLeft.x - dx;
        topLeft.y = viewPortData.topLeft.y - dy;
        const newData = setTopLeft(topLeft, viewPortData)
        const cursorPoint = { x: this.startPoint.x, y: this.startPoint.y }
        setViewPortData(setCurCoord(cursorPoint, curPoint, newData))

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
