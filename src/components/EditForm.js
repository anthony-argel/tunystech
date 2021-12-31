import React, {useState,useRef, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import '../assets/PostForm.css';
const EditForm = (props) => {
    const [post, setPost] = useState('');
    const [linker, setLinker] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false); 
    const [posted, setPosted] = useState(false);
    const editorRef = useRef(null);
    const {id} = useParams();

    useEffect(() => {
        if(props.api === '') return;
        let url = props.api+'/blog/'+id
        if(props.loggedIn) url = props.api +'/admin/blog/'+id;
        fetch(url, {
            method: "GET",
            mode:'cors',
            headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')  }
        }).then(res => {
            if(res.status === 200 || res.status === 304) {
                return res.json();
            }
        }).then(res => {
            if(res.length > 0) {
                let data = res[0];

                setLinker(data.linkedto)
                setPost(data.post);
                setTitle(data.title);
            }
        })
    }, [props.api, id, props.loggedIn])

    const submitPost = (e) => {
        if(typeof linker === 'undefined' || post === '' || title === '') {
            e.preventDefault();
            setError(true);
            return;
        }
        if(props.api !== '') {
            e.preventDefault();
            fetch(props.api+'/blog/'+id, {
                method: 'PUT',
                body: JSON.stringify({post:post, linker:linker, title:title}),
                headers: { 'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token') },
                mode: 'cors'
            })
            .then(res => {
                if(res.status === 401) { // token expired
                    localStorage.removeItem('token');
                }
                if(res.status === 200) {
                    setPosted(true);
                }    
            })
        }
    }

    return (
        <div className='container'>
        {props.loggedIn ? null: <Redirect push to='/'/>}
        {posted ? <Redirect push to='/'/>: null}
            <div className='row'>
                <div className='col-12 p-3'>
                    {error ? <p>Form is not completely filled out</p> : null}
                    <form onSubmit={submitPost}>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="linker" className="form-label">Linker:</label>
                            <input type="text" className="form-control" id="linker" value={linker} onChange={e => setLinker(e.target.value)}/>
                        </div>

                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            onEditorChange={(content, editor) => setPost(content)}
                            value={post ? post : ""}
                            init={{
                            height: 500,
                            menubar: 'insert',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount media'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditForm;