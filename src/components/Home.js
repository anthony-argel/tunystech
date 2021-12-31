import React from 'react';
import MainPage from './MainPage';
const Home = (props) => {
    return (
        <div>
            <MainPage api={props.api} linkname='home' title={'Home'} loggedIn={props.loggedIn}></MainPage>
        </div>
    )
}

export default Home;