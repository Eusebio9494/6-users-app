import React from 'react';

const Login = () => {
    return (
        <div className="modal" style={ {display: 'block'}} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login Page</h5>
                    </div>
                    <form>
                        <div class="modal-body">
                            <input className='form-control my-3 w-75'
                            placeholder='Username'
                            name='username'>

                            </input>
                            <input className='form-control my-3 w-75'
                            placeholder='Password'
                            name='password'
                            type='password'>

                            </input>
                        </div>
                        <div className="modal-footer">
                            <button 
                            className="btn btn-primary"
                            type="submit">Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
