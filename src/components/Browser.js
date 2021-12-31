import React, { useEffect, useState, useCallback} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Card from './Card';

const Browser = (props) => {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState(1);

    const getPosts = useCallback(() => {
        let url = props.api+props.link
        if(props.loggedIn) url = props.api + '/blog'+props.link
        fetch(url, {
            method:'GET',
            mode:'cors',
            headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')  },
        }).then(res => {
            if(res.status === 200 || res.status === 304) {
                return res.json();
            }
        }).then(res => {
            if(typeof res !== 'undefined') {
                setPosts(res.posts);
                setPages(Math.ceil(res.totalposts / 10));
            }
        })
    }, [props.api, props.loggedIn, props.link]);

    useEffect(() => {
        if(props.api === '') return;
        if(typeof props.title !== 'undefined') document.title = `Admin Panel | Tuny's Tech`;
    }, [props.api, props.title])

    useEffect(() => {
        if(props.api === '') return;
        getPosts();
    }, [props.api, props.loggedIn, getPosts])

   

    function updateVisibility(e, post) {
        if(props.api === '' || typeof post === 'undefined') return;
        e.preventDefault();
        fetch(props.api+'/blog/'+post._id, {
            method:'PUT',
            body: JSON.stringify({visible:!post.visible, post:'', title:''}),
            headers: { 'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')  },
            mode: 'cors'
        }).then(res => {
            if(res.status === 200 || res.status === 302) {
                getPosts();
            }
        })
    }

    function updateLastUpDate(e, post) {
        if(props.api === '' || typeof post === 'undefined') return;
        e.preventDefault();
        fetch(props.api+'/blog/'+post._id, {
            method:'PUT',
            body: JSON.stringify({pleaseUpdate:'update'}),
            headers: { 'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')  },
            mode: 'cors'
        }).then(res => {
            if(res.status === 200 || res.status === 302) {
                getPosts();
            }
        })
    }


    return (
        <div className='container'>
            {props.startpos === 3 ? <Redirect to='/posts/2'></Redirect> : null}
            <div className='row gx-3'>
                <div className='col-12 col-lg-9'>
                {
                    typeof posts !== 'undefined' && posts.length > 0 ? 
                    posts.map((value, index) => {
                        return (
                            <Card key={value._id} api={props.api} post={value} loggedIn={props.loggedIn} updateLastUpDate={updateLastUpDate} updateVisibility={updateVisibility}></Card>
                        )
                    })
                    :
                    <div className='p-3 mt-3 mb-3 text-center' style={{'backgroundColor':'white'}} >
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Searching...</span>
                        </div>
                        <p>Searching...<br/>If you see this for more than a few seconds, no searches found.</p>
                    </div>
                }




            <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center ">
                        {
                            props.startpos === '1' ?
                            <li className="page-item disabled" >
                            <Link className="page-link" to={`${props.pageurl}${parseInt(props.startpos) - 1}`} tabIndex="-1" aria-disabled="true">&lt;&lt;</Link>
                            </li> :
                            <li className="page-item">
                            <Link className="page-link" to={`${props.pageurl}${parseInt(props.startpos) - 1}`} tabIndex="-1" aria-disabled="true">&lt;&lt;</Link>
                            </li>
                        }{
                            props.startpos === '1' ? 
                            <li className="page-item" ><Link className="page-link" style={{background: "#0d6efd", color:"#fff"}} to={`${props.pageurl}1`}>1</Link></li> :
                            <li className="page-item"><Link className="page-link" to={`${props.pageurl}1`}>1</Link></li>
                        }
                        {pages >= 2 ? 
                        [...Array(pages)].map((value, ind) => {
                            if(ind === 0) return null;
                            return (
                                ind + 1=== parseInt(props.startpos) ? 
                                    <li className="page-item" 
                                    key={ind}><Link className="page-link" to={`${props.pageurl}${ind + 1}`} style={{background: "#0d6efd", color:"#fff"}}>{ind + 1}</Link></li> : 

                                    <li className="page-item" 
                                    key={ind}><Link className="page-link" to={`${props.pageurl}${ind + 1}`}  >{ind + 1}</Link></li>
                            )
                        })
                        :
                        null
                        }
                        {
                            parseInt(props.startpos) + 1 <= pages ?
                            <li className="page-item">
                            <Link className="page-link" to={`${props.pageurl}${parseInt(props.startpos) + 1}`}>&gt;&gt;</Link>
                            </li>
                            :
                            <li className="page-item disabled">
                            <Link className="page-link" to={`${props.pageurl}${parseInt(props.startpos) + 1}`} tabIndex="-1" aria-disabled="true">&gt;&gt;</Link>
                            </li>
                        }
                    </ul>
        </nav>





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

export default Browser;