import React from "react";
import MainPage from "./MainPage";

const About = (props) => {
    return (
      <div>
          <MainPage api={props.api} linkname='about' title={'About'} loggedIn={props.loggedIn}></MainPage>
      </div>
    )
}

export default About;