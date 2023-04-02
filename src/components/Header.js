import React from 'react';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
//import User from './User';

const Header =  ()=>{
        return <div className={"header"}>
            <ToolBar noTitle={true} wide={true}>
                <div style={{display:"flex", flexWrap:"none", gap: "1em", alignItems:"center", width:"100%"}}>
                    <div className='title'>{title}</div>
                    <ToolButton icon="help" title={captions.title} onClick={()=>{appActions.showHelp(true)}}/>
                    {/* <User/> */}
                </div>
            </ToolBar>
        </div>
}

export default Header;