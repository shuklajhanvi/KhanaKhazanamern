
import { useCart } from '../components/ContextReducer';
import React, { useState } from 'react'
import{Link,useNavigate } from 'react-router-dom' 
import Cart from '../screens/Cart';
import Modals from '../Modals';
import Badge from "react-bootstrap/Badge";


const Navbar = () => {
  let data = useCart();
  const [search, setSearch] = useState('')
  const[cartView,setCartView]=useState(false)
  let navigate = useNavigate();
  const handleLogout = () => {
      localStorage.removeItem('authToken')

      navigate("/login")
  }

  return (
    <div>
   {/* <nav className="navbar navbar-light bg-light">
  <div  >
    <a className="navbar-brand" href="#" style={{fontFamily: 'cursive'}}>
      <img src="https://yt3.googleusercontent.com/5IHf1LUhc7Bzr7krGyGUBoYDDkuKMbO_g8i2nkodRlbWxShYrdMIiQaC6AqI2fxthkvkWonTWQ=s900-c-k-c0x00ffffff-no-rj" alt="" width="200" height="50" class="d-inline-block align-text-top"/>
         khana khazana.com
    </a>
  </div>
</nav>*/}

      <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <a className="navbar-brand" href="#" style={{fontFamily: 'cursive'}}>
      <img src="https://lh3.googleusercontent.com/S30-4cx5rGMx2DRoSMq1h9qq7EcU9sf8y_w1yBWG4duf9xWpYF5TFovh7IkF6MXnvw" alt="" width="100" height="50" style={{ padding: "0"}} />
        
    </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          
            <div className='nav-item nav-link active me-auto mb-2 d-flex'>
           
            {(localStorage.getItem("authToken"))?
          <div className="" >
        <Link className="nav-link active fs-5 text-black " to="/myOrder"> myorder</Link> 
        </div>
           :"" }
            </div>
           
            {(!localStorage.getItem("authToken"))?
            <div className='d-flex'>
            <Link className="btn bg-danger text-white mx1" to="/login">Login</Link>{"  "}
            < Link className="btn bg-danger text-white mx1" to="/createuser">SignUp</Link>
</div>
:        <div>   
             <div className="btn bg-danger text-white mx1" onClick={handleLogout} >Logout</div>{"  "}
            < div className="btn bg-danger text-white mx1" onClick={()=>(setCartView(true))} >mycart
            <Badge pill bg="success">{data.length}</Badge>
            </div>
            {cartView ? <Modals onClose={() => setCartView(false)}><Cart></Cart></Modals> : ""}
          </div>
}


          </div>
      
      </nav>
</div>
  )
}

export default Navbar
