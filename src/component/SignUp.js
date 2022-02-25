import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.            
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the authtoken and redirect
            localStorage.setItem('token', json.authtoke);
            navigate("/")
            props.showAlert("success", "Account Created successfully.")
        }
        else {
            props.showAlert("danger", "Invalid Credentials")
        }

    }

    const onChange = (e) => {
        //this will target input element name and update the valus of input as we type check on console react
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-3'>
            <h2 className='mb-5'>SignUp to NoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" name='name' className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword' minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp