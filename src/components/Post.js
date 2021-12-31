import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/Post.css';
import {DateTime} from 'luxon';

const Post = (props) => {
    const {id} = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        if(props.api === '') return;
        let url = props.api + '/blog/'+id;
        if(props.loggedIn) url = props.api + '/admin/blog/'+id
        fetch(url, {
            method:'GET',
            mode:'cors',
            headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')  }
        }).then(res => {
            if(res.status === 200 || res.status === 304){
                return res.json();
            }
        }).then(res => typeof res !== 'undefined' && res.length > 0 ? setData(res[0]) : null)


    }, [props.api, id, props.loggedIn])

    useEffect(() => {
        if(typeof data === 'undefined') return;
        document.title = data.title + " - Tuny's Tech";
    }, [data])

    return (
        <div className='container'>
            <div className='row'>
                {typeof data !== 'undefined' ? 
                    <div className='col-12'>
                            <div className='mt-3 mb-3 p-3 border border-secondary' style={{backgroundColor:'white'}}>
                                <h2>{data.title}</h2>
                                <p>Last Updated: {DateTime.fromISO(data.lastupdate).toFormat('LLL dd, yyyy')}</p>
                                <hr></hr>
                                <div dangerouslySetInnerHTML={{__html:data.post}}></div>
                            </div>
                    </div>
                
                : 
                <div className='p-3 mt-3 mb-3 mx-3 text-center' style={{'backgroundColor':'white'}} >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Searching...</span>
                    </div>
                    <p>Searching...<br/>If you see this for more than a few seconds, no searches found.</p>
                </div>}
            </div>
        </div>
    )
}

export default Post;