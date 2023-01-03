import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Decor() {

  const [allDecor, setAllDecor] = useState([]);

  async function getDecor() {
    let { data } = await axios.get('http://localhost:5000/product/');
    let electronic = []
    for (let i = 0; i < data.result.length; i++) {
      if (data.result[i].category === "63b195f1f15aa9127abe30fe") {
        electronic.push(data.result[i])
      }
    }
    setAllDecor(electronic)
  }

  useEffect(() => {
    getDecor();
  }, [])
  console.log(allDecor);

  return (
    <>
      <div className=' row d-flex justify-content-center pt-5'>
        {allDecor.map((data, i) =>
          <div key={i} className=" col-md-4 my-3 pt-3 ">
            <div className="card text-bg-dark " >
              <img className=' w-100 height-img' src={data.imageCover} alt="" />
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
