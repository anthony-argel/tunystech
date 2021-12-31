import React, { useEffect, useState } from 'react';
const MainPage = (props) => {
    let [post, setPost] = useState('');

    useEffect(() => {
        if(props.api === '') return;

        if(typeof props.title !== 'undefined') document.title = props.title + ` | Tuny's Tech`;
        
        fetch(props.api+'/link/'+props.linkname, {
            method: 'GET',
            mode: 'cors'
        }).then(res => {
            if(res.status === 200 || res.status === 304) {
                return res.json();
            }
        }).then(res => typeof res !== 'undefined' && res.length > 0 ? setPost(res[0].post) : null)
        
    }, [props.api, props.title, props.linkname])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-lg-9'>
                    <div className='p-3 mt-3 mb-3 border border-secondary' style={{'backgroundColor':'white'}}>
                        {typeof post !== 'undefined' && post !== '' ?
                       <div dangerouslySetInnerHTML={{__html:post}}></div>
                       :
                    <div className='p-3 mt-3 mb-3 text-center' style={{'backgroundColor':'white'}} >
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Searching...</span>
                        </div>
                        <p>Searching...<br/>If you see this for more than a few seconds, no searches found.</p>
                    </div>
                        }
                    </div>       
                    
                </div>
                <div className='col-12 col-lg-3' >
                    <div className='p-3 mt-3 mb-3 border border-secondary' style={{'backgroundColor':'white'}}>
                        <p>Contact</p>
                        <hr></hr>
                        <a className='text-center' href='https://twitter.com/anthony_argel'>Twitter</a>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default MainPage;