import React, { useState } from 'react'
import{Link} from 'react-router-dom'


const Signup = () => {
  const[credentials,setcredentials]=useState({name:"",geolocation:"",email:"",password:""})
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response= await fetch("http://localhost:5000/api/createuser",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({name:credentials.name,location:credentials.geolocation,email:credentials.email,password:credentials.password})
   
    })
  
  const json =await response.json()
  console.log(json);

   if(!json.success){
    alert("enter valid credentials")
   }
  }
  
  const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
  }



  return (
    <>
    <div className='container'>
   <form onSubmit={handleSubmit}>
   <div className="form-group">
    <label htmlFor="uname">username</label>
    <input type="text" className="form-control" name='name' value={credentials.name} placeholder="enter username" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputlocation">location</label>
    <input type="text" className="form-control"  placeholder="location" name='geolocation'value={credentials.geolocation} onChange={onChange}/>
  </div>
  
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"  name='email' value={credentials.email} onChange={onChange}  />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password'value={credentials.password} onChange={onChange}/>
  </div>
 
  
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>already a user</Link>
</form>
</div>
  </>)
}

export default Signup
