import React from 'react';
import ViewPortContainer from './ViewPortContainer';

export default function MainContainer(){
    return <div className={'main-container'}>
        <div className='work-container'>
            <div className={'viewport-container'}>
                <ViewPortContainer/>
            </div>
            
        </div>
        
    </div>
}

