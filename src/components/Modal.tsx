import React, { useRef, useState, ReactNode } from 'react';
import blink from '../functions/blink';

export type TModalProps = {
    header: string,
    children: ReactNode
    wide?: boolean
}
export default function Modal(props: TModalProps) {
    const refHeader = useRef<HTMLInputElement>(null)
    const { onPointerDown, onPointerMove, onPointerLeave, onPointerUp } = useDragElement(refHeader.current)
    return <div className='modal-container noselect' onClick={blink} >
        <div ref={refHeader} className={"toolbar-modal shadow-box"} style={props.wide ? { display: "block", width: "100%" } : {}} onClick={(e) => { e.stopPropagation() }}>
            <div
                style={{ maxWidth: "400px", wordWrap: "break-word", textAlign: "center" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            >
                {props.header}

            </div>
            {props.children}
        </div>
    </div>

}

function useDragElement(element: HTMLElement | null) {
    const [dragState, setDragState] = useState({ drag: false, x0: 0, y0: 0 })
    return {
        onPointerDown: (e: React.MouseEvent<Element, MouseEvent>) => {
            const el: HTMLElement | null = e.target as HTMLElement
            const rect = el.getBoundingClientRect()
            setDragState({ drag: true, x0: e.clientX - rect.left, y0: e.clientY - rect.top })
        },
        onPointerMove: (e: React.MouseEvent<Element, MouseEvent>) => {
            if (dragState.drag) {
                const el: HTMLElement | null = e.target as HTMLElement
                if (!element) return
                const rect = el.getBoundingClientRect();
                const style = getComputedStyle(element)
                const x = e.clientX - rect.left - dragState.x0 + parseInt(style.left)
                const y = e.clientY - rect.top - dragState.y0 + parseInt(style.top)
                element.style.left = `${x}px`
                element.style.top = `${y}px`
            }
        },
        onPointerLeave: () => { setDragState(prev => ({ ...prev, drag: false })) },
        onPointerUp: () => { setDragState(prev => ({ ...prev, drag: false })) }
    }
}