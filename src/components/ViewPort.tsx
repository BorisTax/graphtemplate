import React, { useEffect, useLayoutEffect, useRef } from 'react';
import ToolBar from './ToolBar';
import { paint } from '../functions/drawFunctions';
import { addWindowListeners, zoomToRect } from '../functions/viewPortFunctions';
import useEvents from '../customHooks/useEvents.js';
import useDoubleClick from '../customHooks/useDoubleClick.js';
import { ViewPortState } from '../atoms/viewportAtoms';
import { EventHandlers } from './ViewPortContainer';
import { isMobile } from '../reducers/functions.js';
import { AllAtomsProps } from '../customHooks/useAllAtoms';

export type ViewPortProps = AllAtomsProps & {
    eventHandlers: EventHandlers
}

export default function ViewPort({ viewPortData, setViewPortData, shapeState, handler, eventHandlers }: ViewPortProps) {
    const events = useEvents(isMobile(), eventHandlers)
    const refCanvas: { current: any } = useRef()
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = refCanvas.current.getContext('2d')

        paint(ctx, {viewPortData, shapeState, handler})
    }, [shapeState, viewPortData])
    useLayoutEffect(() => {
        refCanvas.current.addEventListener("wheel", (e: WheelEvent) => {
            eventHandlers.onMouseWheel(e);
            e.preventDefault();
        })
        addWindowListeners(viewPortData, setViewPortData, refCanvas.current)
    }, [])
    useEffect(() => {
        setViewPortData(zoomToRect({ topLeft: { x: -100, y: 100 }, bottomRight: { x: 100, y: -100 } }, viewPortData));
    }, [])
    const doubleClick = useDoubleClick(eventHandlers, (e: PointerEvent) => eventHandlers.onDoubleClick(e))
    return <ToolBar id={"canvas-container"} noTitle={true} wide={false}>
        <canvas ref={refCanvas} id="canvas" style={{ width: `${viewPortData.viewPortWidth}px`, height: `${viewPortData.viewPortHeight}px`, cursor: 'none' }} width={viewPortData.viewPortWidth} height={viewPortData.viewPortHeight}
            {...events}
            onClick={doubleClick}
           
            onContextMenu={(e: any) => { e.preventDefault() }}
        >
        </canvas>
    </ToolBar>
}

