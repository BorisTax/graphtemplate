import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Body from './Body';
//import Login from './components/Login'
//import Register from './components/Register';
export default function App(){
        return <BrowserRouter>
                <Routes>
                <Route path='/' element={<Body/>}/>
                </Routes>
            </BrowserRouter>
}
