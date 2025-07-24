import React from 'react'
import category from "../../asssets/Category/category"
import rect_icon from "../../asssets/rect_icon.png"
import ItemCateg from "../ItemCateg/ItemCateg"
import "./category.css"
const Category = () => {
  return (
    <div className='category container'>
        <div className=" d-flex  mb-3 title1">
            <img src={rect_icon} alt="" width={"18px"} height={"45px"} />
            <span className="ms-2 fs-4">Categories</span>
        </div>
        <div className="mb-4 title2">
        <span className="fs-5 ">Browse By Category</span>
      </div>
      <div className="row g-3">
        {category.map((item, i) => (
          <div key={i} className="col-6 col-md-4 col-lg-3">
            <ItemCateg 
              id={item.id} 
              image={item.image} 
              name={item.name} 
            />
          </div>
        ))}
      </div>
      
    </div>

  
  )
}

export default Category
