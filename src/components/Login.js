import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
const Login = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false)


    function login(e){
        if(props.api !== '') {
            e.preventDefault();
            fetch(props.api + '/login', {
                method: 'POST',
                body: JSON.stringify({username: user, password: pass}),
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            })
            .then(res => {
                if(res.status !== 200){
                    setError(true);
                }
                else {
                    return res.json()
                }
            })
            .then(res => {
                if(res) {
                    localStorage.setItem('token', res.token);
                    props.setLoggedIn(true);
                }
            })

        }
    }

    return (
        <div className='container'>
            {props.loggedIn === true ? <Redirect push to='/'/> : null}
            <div className='row'>
                <div className='col-12 d-flex justify-content-center'>

                    <form className='p-5 mt-5' style={{'backgroundColor':'white'}} onSubmit={login}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" aria-describedby="userHelp" onChange={e => {setUser(e.target.value);setError(false)}}/>
                            <div id="userHelp" className="form-text" style={{'color':'red'}}>You shouldn't be here and you know you shouldn't.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={e => {setPass(e.target.value);setError(false);}}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        {error ? <p className='p-0 m-0'>Try again</p> : null}
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;