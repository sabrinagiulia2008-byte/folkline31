import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './screens/Home';
import Explore from './screens/Explore';
import Add from './screens/Add';
import Messages from './screens/Messages';
import Account from './screens/Account';
import './index.css';


export default function App(){
const [screen, setScreen] = useState('Home');
const navigate = useNavigate();


const go = (name, path) => { setScreen(name); if(path) navigate(path); };


return (
<div className="app">
<div className="content">
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/explore" element={<Explore/>} />
<Route path="/add" element={<Add/>} />
<Route path="/messages" element={<Messages/>} />
<Route path="/account" element={<Account/>} />
</Routes>
</div>


<div className="tabBar">
<div className={`tab ${screen==='Home'?'active':''}`} onClick={()=>go('Home','/')}><div>Home</div></div>
<div className={`tab ${screen==='Explore'?'active':''}`} onClick={()=>go('Explore','/explore')}><div>Explore</div></div>
<div className={`tab ${screen==='Add'?'active':''}`} onClick={()=>go('Add','/add')}><div>Add</div></div>
<div className={`tab ${screen==='Messages'?'active':''}`} onClick={()=>go('Messages','/messages')}><div>Messages</div></div>
<div className={`tab ${screen==='Account'?'active':''}`} onClick={()=>go('Account','/account')}><div>Account</div></div>
</div>
</div>
);
}