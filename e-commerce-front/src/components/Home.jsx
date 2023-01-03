import React, { useEffect, useState } from 'react'
import axios from 'axios';

// import { Link } from 'react-router-dom';

export default function Home() {

  const [allProduct, setAllProduct] = useState([]);

  async function getProduct() {
    let { data } = await axios.get('http://localhost:5000/product/');
    setAllProduct(data.result)

  }

  useEffect(() => {
    getProduct();
  }, [])
  console.log(allProduct);
  return (
    <>
      <div className=' row d-flex justify-content-center pt-5'>
        {allProduct.map((data, i) =>
          <div key={i} className=" col-md-4 my-3 pt-3 ">
            <div className="card text-bg-dark " >
              {/* {data.imageCover?<img src={data.imageCover} alt="" />:<img src={require("./download.png")} alt="" />} */}
              <img className=' w-100 height-img'   src={data.imageCover} alt="" />
                <div className="card-body carts">
                  <div className=' d-flex justify-content-between'>
                    <h6 className="card-title">{data.name}</h6>
                    <h5 className="card-title text-warning">{data.price} $</h5>
                  </div>
                  <p className="card-text">{data.description}</p>
                </div>
            </div>
          </div>
        )}



      </div>

    </>
  )
}


