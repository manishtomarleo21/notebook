import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    
    const [credentials, setCredentials] = useState({email:"", password:""});
    let navigate = useNavigate();



    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.            
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
              //save the authtoken and redirect
              localStorage.setItem('token', json.authtoke);
              navigate("/")
              props.showAlert("success", "Logged in successfully.")
          }
          else{
            props.showAlert("danger", "Invalid Credentials")
          }

    }

    const onChange = (e)=>{
        //this will target input element name and update the valus of input as we type check on console react
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login