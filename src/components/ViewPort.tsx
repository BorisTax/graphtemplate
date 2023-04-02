import React, { useEffect, useLayoutEffect, useRef } from 'react';
import ToolBar from './ToolBar.js';
import { paint } from '../functions/drawFunctions.js';
import { addWindowListeners, zoomToRect } from '../functions/viewPortFunctions.js';
import useEvents from '../customHooks/useEvents.js';
import useDoubleClick from '../customHooks/useDoubleClick.js';
import { ViewPortState } from '../atoms/viewportAtoms.js';
import { useAtomValue } from 'jotai';
import { Data, EventHandlers } from './ViewPortContainer.js';
import { isMobile } from '../reducers/functions.js';
import { shapeAtom } from '../atoms/shapeAtoms.js';

export type ViewPortProps = Data & {
    eventHandlers: EventHandlers
}

export default function ViewPort({ viewPortData, setViewPortData, setAtom, getAtom, eventHandlers }: ViewPortProps) {
    const events = useEvents(isMobile(), eventHandlers)
    const refCanvas: { current: any } = useRef()
    const shapes = useAtomValue(shapeAtom)
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = refCanvas.current.getContext('2d')

        paint(ctx, viewPortData, getAtom)
    }, [shapes, viewPortData])
    useLayoutEffect(() => {
        refCanvas.current.addEventListener("wheel", (e: Event) => {
            eventHandlers.onMouseWheel(e);
            e.preventDefault();
        })
        addWindowListeners(viewPortData, setViewPortData, refCanvas.current)
    }, [])
    useEffect(() => {
        setViewPortData((prevData: ViewPortState) => zoomToRect({ topLeft: { x: -100, y: 100 }, bottomRight: { x: 100, y: -100 } }, prevData));
    }, [])
    const doubleClick = useDoubleClick(eventHandlers, (e: Event) => eventHandlers.onDoubleClick(e))
    return <ToolBar id={"canvas-container"} noTitle={true} wide={false}>
        <canvas ref={refCanvas} id="canvas" style={{ width: `${viewPortData.viewPortWidth}px`, height: `${viewPortData.viewPortHeight}px`, cursor: 'none' }} width={viewPortData.viewPortWidth} height={viewPortData.viewPortHeight}
            {...events}
            onClick={doubleClick}
           
            onContextMenu={(e: any) => { e.preventDefault() }}
        >
        </canvas>
    </ToolBar>
}

