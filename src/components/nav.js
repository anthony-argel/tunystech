import {Link} from 'react-router-dom';
import React from 'react';
const Nav = (props) => {

    return (
        <div style={{backgroundColor:'white'}}>
            <div className='p-4'>
                {props.loggedIn ? 
                <h1 className='text-center'><span><Link style={{'color':'purple', 'textDecoration':'none'}} to='/69all/1'>-</Link></span><Link to='/' style={{'color':'pink', 'textDecoration':'none'}}>
                    Tuny's Tech</Link><span><Link style={{'color':'green', 'textDecoration':'none'}} to='/69post'>+</Link></span></h1>
                :
                <h1 className='text-center'><Link to='/' style={{textDecoration:'none', color:'black'}}>Tuny's Tech</Link></h1>
                }
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/a-plus">A+</Link>
                        </li>
                    </ul>

                    <ul className="d-flex navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Nav;