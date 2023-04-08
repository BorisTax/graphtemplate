import React, { useId, useState, ReactNode } from 'react';

export type ToolBarProps = {
        id?: string,
        expanded?: boolean,
        expandable?: boolean,
        caption?: string,
        noTitle?: boolean,
        wide?: boolean,
        children?: ReactNode | ReactNode[],
        extStyle?: {}
}
export default function ToolBar({ id, expanded = true, expandable = true, caption = "", noTitle = false, wide = false, children, extStyle = {} }: ToolBarProps) {
        const [expand, setExpanded] = useState(expanded)
        const useid = useId()
        const _id = id || useid
        const contents = expand ? children : <></>
        return <div id={_id} className={`${wide ? 'toolbar-wide' : 'toolbar'} noselect`} style={extStyle}>
                {!noTitle ?
                        <>
                                <div className={`${expandable ? 'toolbar-header-expandable' : 'toolbar-header'}`} onClick={() => { if (expandable) setExpanded(!expand) }}>
                                        <div className={"noselect"} >{caption}&nbsp;&nbsp;</div>
                                </div>
                                <hr />
                        </>
                        : <></>}
                {contents}
        </div>
}

