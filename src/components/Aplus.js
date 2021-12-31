import React from 'react';
import MainPage from './MainPage';
const Aplus = (props) => {

    return (
        <div>
            <MainPage api={props.api} linkname='aplus' title={'A+'} loggedIn={props.loggedIn}></MainPage>
        </div>
    )
}

export default Aplus;