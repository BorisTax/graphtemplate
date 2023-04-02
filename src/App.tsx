import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Body from './Body';
import Login from './components/Login'
import Register from './components/Register';
export default function App(){
        return <BrowserRouter>
                <Route path='/' element={<Body/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </BrowserRouter>
}
