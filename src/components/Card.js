import React from "react";
import {Link} from 'react-router-dom';

const Card = (props) => {



    return (
        <div className='mt-3 mb-3 p-3 border border-secondary' style={{'backgroundColor':'white'}}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-lg-9 overflow-hidden'>
                        <p>{props.post.post.substring(0,100)}</p>
                        <Link className="btn btn-success mt-3" to={'/post/'+props.post._id}>See More</Link>
                        {props.loggedIn === true ? 
                        <Link className="btn btn-success mt-3 ms-3" to={'/edit/'+props.post._id}>Edit Post</Link> : null}
                        {props.loggedIn === true ? 
                        <button className='btn btn-danger mt-3 ms-3' onClick={e => props.updateLastUpDate(e, props.post)}>Update Date</button>
                         : null}
                        {props.loggedIn === true ? 
                            props.post.visible === true ? <button className="btn btn-warning mt-3 ms-3" onClick={e => props.updateVisibility(e, props.post)}>Hide Post</button>: <button onClick={e => props.updateVisibility(e, props.post)} className="btn btn-primary mt-3 ms-3" >Reveal Post</button>
                         : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;