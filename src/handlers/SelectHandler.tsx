import { MouseHandler } from "./MouseHandler";
import { isMobile } from "../reducers/functions";
import { setCurCoord } from "../functions/viewPortFunctions";
import Geometry from "../utils/geometry";
import { IHandlerDraggable, TMouseProps, TTouchProps } from "../interfaces/HandlerInterface";
import { addShapeToSelection, selectedShapeAtom, shapeAtom, updateShapes } from "../atoms/shapeAtoms";
import { PanHandler } from "./PanHandler";
import { setHandler } from "../atoms/handlerAtoms";

export class SelectHandler extends MouseHandler implements IHandlerDraggable {
    drag = false
    activeShape = null

    move(props: TMouseProps) {
        const { curPoint, viewPortData, setViewPortData, shapes, keys } = props
        super.move(props);
        if (this.drag) {
            //if (!keys.shiftKey) appData.selectedPanels.clear()
            //setAtom(addShapeToSelection)(this.activeShape)
            return;
        } 
        this.activeShape = null;
        for (let p of shapes) {
            if (!p.state.selectable) continue;
            if (p.isUnderCursor(this.curPoint, viewPortData.pixelRatio)) {
                p.setState({ highlighted: true })
                this.activeShape = p;
            } else {
                p.setState({ highlighted: false })
            }
        }
        
        setViewPortData(prevData => setCurCoord(this.curPoint, curPoint, prevData));

    }
    down(props: TMouseProps) {
        const { button, curPoint, viewPortData, setViewPortData, keys ={} } = props
        super.down(props)

        setViewPortData(prevData => setCurCoord(this.curPoint, curPoint, prevData));
        if (button === 1 || button === 2) {
            setAtom(setHandler)({handler: new PanHandler(this.curPoint), prevHandler: this})
            return
        }
        if (button !== 0) return
        this.activeShape = null;
        const shapes = getAtom(shapeAtom)
        const selected = getAtom(selectedShapeAtom)
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
        setAtom(updateShapes)()
    }
    click(props: TMouseProps) {
        const { button, curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys = {} } = props
        super.click(props);
        if (button !== 0) return
        const shapes = getAtom(shapeAtom)
        const selected = getAtom(selectedShapeAtom)
        for (let p of shapes) {
            if (p.isUnderCursor(this.curPoint, viewPortData.pixelRatio)) {
                if (keys.shiftKey) {
                    if(selected.selectedPanels.has(p)) selected.delete(p);
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
        setAtom(updateShapes)()
    }
    doubleClick(props: TMouseProps) {
        const { button, curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys } = props
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
        const { pointerId, curPoint, viewPortData, setViewPortData, setAtom, getAtom } = props
        super.touchDown(props)
        this.down({...props, button: 0, keys: {shiftKey: false, ctrlKey: false, altKey: false}})
    }
    touchMove(props: TTouchProps) {
        const { pointerId, curPoint, viewPortData, setViewPortData, setAtom, getAtom } = props
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
            setAtom(setHandler)({handler: new PanHandler(this.curPoint), prevHandler: this})
        }
    }
}