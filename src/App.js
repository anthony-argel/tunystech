import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Nav from './components/nav';
import Footer from './components/footer';
import Home from './components/Home';
import Login from './components/Login';
import PostForm from './components/PostForm';
import EditForm from './components/EditForm';
import Aplus from './components/Aplus';
import Post from './components/Post';
import About from './components/About';
import MyBrowser from './components/Browser';

function App() {
  const [api, setAPI] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setAPI('https://polar-atoll-91842.herokuapp.com');
    verifyToken();
  }, [])

  const verifyToken = () => {
    if(localStorage.getItem('token') === null) {
        return;
    }

    fetch('https://polar-atoll-91842.herokuapp.com/verify',{
        method:'GET', 
        headers: { 'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token') },
        mode:'cors'
    })
    .then(res => {
        if(res.status === 403 || res.status === 401) {
        localStorage.removeItem('token');
        setLoggedIn(false);
        }
        else {
        setLoggedIn(true);
        }
    }) 
  }

  return (
    <div className="App" style={{'backgroundColor':'#efefef'}}>
      <div style={{'minHeight':'95vh'}}>
        <BrowserRouter>
        <Nav loggedIn={loggedIn} api={api}></Nav>
          <Switch>
            <Route path='/' exact><Home api={api} loggedIn={loggedIn}/></Route>
            <Route path='/a-plus' exact><Aplus api={api} loggedIn={loggedIn}></Aplus></Route>
            <Route path='/about' exact><About api={api} loggedIn={loggedIn}></About></Route>
            <Route path='/edit/:id' exact><EditForm api={api} loggedIn={loggedIn}></EditForm></Route> 
            <Route path='/post/:id' exact><Post api={api} loggedIn={loggedIn}></Post></Route> {/*We can just rewrite url with post title?*/}
            <Route path='/69login' exact><Login api={api} loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Login></Route>
            <Route path='/69post' exact><PostForm api={api} loggedIn={loggedIn}></PostForm></Route>
            <Route path='/69all/:pageno' exact><MyBrowser api={api} loggedIn={loggedIn} link={'/posts/1'}></MyBrowser></Route>
          </Switch>
        </BrowserRouter>
      </div>
    
      <Footer></Footer>
    </div>
  );
}

export default App;
