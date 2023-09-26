
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'


const Home = () => {
  const [search, setSearch] = useState('')
const[foodCat,setFoodCat]=useState([]);
const[fooditem,setFoodItem]=useState([])


const loadData= async()=>{
  let response= await fetch ("http://localhost:5000/api/foodData",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'

    }
  })
  response = await response.json()
  setFoodItem(response[0])
  setFoodCat(response[1])
}
  useEffect(() => {
    loadData()
  }, [])



  return (
    <>
   

   
     <div ><Navbar/>
     </div>
     
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <span className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </span>
            </div>
            
            <div className="carousel-item active" >
              <img src="https://assets.indiadesire.com/images/pizza5000.jpg" className="d-block w-100  " width="100" height="600" style={{ filter: "brightness(60%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://lorenzplumbing.files.wordpress.com/2011/04/20off.jpg" className="d-block w-100 "  width="100" height="600" style={{ filter: "brightness(60%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      
  
</div>
     <div className='container'>
      {foodCat !== []
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {fooditem !== [] ? fooditem.filter(
                    (items) => (items.CategoryName === data.CategoryName)&&(items.name.toLowerCase().includes(search.toLowerCase())) )
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
     
      
     
    <div><Footer/></div>
    </>
   
  )
}

export default Home
