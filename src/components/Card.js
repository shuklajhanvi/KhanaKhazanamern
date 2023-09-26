

import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
const Card = (props) => {
  let fooditem = props.item;
  const dispatch = useDispatchCart();
  let data=useCart()
  let options=props.options;
  const priceRef = useRef();
  let priceOptions=Object.keys(options)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const handleAddtocart=async()=>
  {
    let food = []
    for (const item of data) {
      if (item.id === fooditem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: fooditem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({  type: "ADD", id: fooditem._id, name: fooditem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
   return
      }
  return
  } 
       await dispatch({  type: "ADD", id: fooditem._id, name: fooditem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
   // console.log(data)
  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)},[])
  return (
    <div>
       <div className="card mt-3" style={{"width": "18 rem","maxHeight":"360px"}}>
            <img  className="card-img-top" src={props.ImgSrc}  alt="..."  style={{ height: "120px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodName}</h5>
                <p className="card-text">{props.fooddescription}.</p>
            <div className='container w-100'></div>
                <select className='m-2 h-100  bg-warning rounded' onChange={(e)=>setQty(e.target.value)}>
                    {Array.from(Array(6),(e,i)=>
                    {return(
                        <option key={i+1} value={i+1}>{i+1}</option>
                    )}
)}
                </select>
                <select className='m-2 h-100 bg-warning rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
               
                {priceOptions.map((data)=>
                {
                  return <option key={data} value={data}>{data}</option>
              })}
                </select>
                <div className='d-inline h-100'>
                ₹{finalPrice}/-
                </div>
                <div className='d- h-100'>
                 Price           
                
                
                
                <button className={'btn btn-danger justify-center ms-2'} onClick={handleAddtocart}>add to cart</button>
                </div>
  
  </div>
</div>
    </div>
  )
}

export default Card
