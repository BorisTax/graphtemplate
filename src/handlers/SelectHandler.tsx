import { MouseHandler } from "./MouseHandler";
import { isMobile } from "../reducers/functions";
import { setCurCoord } from "../functions/viewPortFunctions";
import Geometry from "../utils/geometry";
import { IHandlerDraggable, TMouseProps, TTouchProps } from "../interfaces/HandlerInterface";
import { PanHandler } from "./PanHandler";
import Shape from "../components/shapes/Shape";
import { Actions } from "../atoms/actions";

export class SelectHandler extends MouseHandler implements IHandlerDraggable {
    drag = false
    activeShape: Shape | null = null

    move(props: TMouseProps) {
        const { curPoint, viewPortData, setViewPortData, shapeState, keys } = props
        super.move(props);
        if (this.drag) {
            //if (!keys.shiftKey) appData.selectedPanels.clear()
            //setAtom(addShapeToSelection)(this.activeShape)
            return;
        } 
        this.activeShape = null;
        for (let p of shapeState.shapes) {
            if (!p.state.selectable) continue;
            if (p.isUnderCursor(this.curPoint, viewPortData.pixelRatio)) {
                p.setState({ highlighted: true })
                this.activeShape = p;
            } else {
                p.setState({ highlighted: false })
            }
        }
        
        setViewPortData(setCurCoord(this.curPoint, curPoint, viewPortData));

    }
    down(props: TMouseProps) {
        const { button, curPoint, viewPortData, setViewPortData, shapeState, setShapeState, setHandler, keys ={} } = props
        super.down(props)

        setViewPortData(setCurCoord(this.curPoint, curPoint, viewPortData));
        if (button === 1 || button === 2) {
            setHandler(Actions.setHandler(new PanHandler(this.curPoint), this))
            return
        }
        if (button !== 0) return
        this.activeShape = null;
        const shapes = shapeState.shapes
        const selected = shapeState.selected
        for (let p of shapes) {
            if (!p.state.selectable) continue;
            if (p.isUnderCursor(this.curPoint, viewPortData.pixelRatio)) {
                this.activeShape = p;
                if(!p.state.selected && !keys.shiftKey) selected.clear()
            } else {
                //p.setState({ selected: false })
            }
        }
        this.drag = false;
        if (isMobile()) {  }
        setShapeState(Actions.updateShapes())
    }
    click(props: TMouseProps) {
        const { button, curPoint, viewPortData, setViewPortData, setShapeState, shapeState, keys = {} } = props
        super.click(props);
        if (button !== 0) return
        const shapes = shapeState.shapes
        const selected = shapeState.selected
        for (let p of shapes) {
            if (p.isUnderCursor(this.curPoint, viewPortData.pixelRatio)) {
                if (keys.shiftKey) {
                    if(selected.has(p)) selected.delete(p);
                            else selected.add(p)
                } else {
                    selected.add(p)
                }
            } else {
                if (!keys.shiftKey) {
                    selected.delete(p)
                }
            }
        }
        setShapeState(Actions.updateShapes())
    }
    doubleClick(props: TMouseProps) {
        const { button, curPoint, viewPortData, setViewPortData, setShapeState, shapeState, keys } = props
        super.doubleClick(props)

    }

    keypress(code: string) {
        return super.keypress(code)
    }
    up(props: TMouseProps) {
        this.drag = false;
        //appActions.updateState()
    }

    touchDown(props: TTouchProps) {
        super.touchDown(props)
        this.down({...props, button: 0, keys: {shiftKey: false, ctrlKey: false, altKey: false}})
    }
    touchMove(props: TTouchProps) {
        const { pointerId, curPoint, viewPortData, setViewPortData, setHandler } = props
        super.touchMove(props)
        const tm = viewPortData.touchManager
        if (tm.getTouchCount() > 1) {
            const diff = Geometry.distance(tm.touches[0].curPoint, tm.touches[1].curPoint)
            const midPoint = Geometry.midPoint(tm.touches[0].curPoint, tm.touches[1].curPoint)
            const delta = tm.prevDiff - diff
            if (Math.abs(delta) > 10) {
                const deltaY = Math.sign(delta)
                this.wheel({ ...props, deltaY})
                tm.prevDiff = diff
            }
        }
        if (tm.getTouchCount() === 1) {
            if (this.drag) {
                //appData.panels.forEach(p => p.state.selected = false)
                //if(this.activeShape) this.activeShape.setState({selected: true})
                //appActions.movePanel(this.activeShape, this.dragPos);
                return;
            }
            setHandler(Actions.setHandler(new PanHandler(this.curPoint), this))
        }
    }
}