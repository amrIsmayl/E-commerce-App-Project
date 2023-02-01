import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { counterContext } from './Context/Store';

export default function Electronics(props) {
  const [allElectronics, setAllElectronics] = useState([]);
  const [searchElectronics, setSearchElectronics] = useState([]);

  async function getElectronics() {
    let { data } = await axios.get('http://localhost:5000/product/');
    let electronic = []
    for (let i = 0; i < data.result.length; i++) {
      if (data.result[i].category === "6360e65fc10b2ba0434525bc") {
        electronic.push(data.result[i])
      }
    }
    setAllElectronics(electronic)
  }

  let { incrementProduct, incrementcount } = useContext(counterContext);

  useEffect(() => {
    getElectronics();
  }, [])

  function searchByProducer(e) {
    let term = e.target.value;

    let searchResult = [];

    for (let i = 0; i < allElectronics.length; i++) {
      if (allElectronics[i].name.toUpperCase().includes(term.toUpperCase()) === true && term) {
        searchResult.push(allElectronics[i]);
      }
    }
    setSearchElectronics(searchResult);
  }

  return (
    <>
      <div className=' row d-flex justify-content-center pt-5'>

        <div className=' col-md-5 pt-5'>
          <h2 className=' p-2 '>Electronics Department</h2>
          <p className=' p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat deserunt reiciendis laudantium doloremque alias ipsum!</p>
        </div>
        <div className=' col-md-7 px-4 pt-5'>
          <h1 className=' pb-3 pt-3'>search by Producer</h1>
          <input onInput={searchByProducer} type="text" className=' w-100 bg-secondary text-white' />
        </div>

        {searchElectronics.length > 0 ?
          searchElectronics.map((data, i) =>
            <div key={i} className=" col-md-4 my-3 pt-3  ">
              <div className="card bg-carts-search rounded-4" >
                <div className=' scale_img'>
                  <img className=' w-100 height-img rounded-4 ' src={data.imageCover} alt="" />
                </div>
                <div className="card-body carts">
                  <div className=' d-flex justify-content-between'>
                    <h6 className="card-title">{data.name}</h6>
                    <h5 className="card-title text-warning">{data.price} $</h5>
                  </div>
                  <p className="card-text">{data.description}</p>
                </div>
                <div className=" carts_foter d-flex justify-content-center align-items-center">
                  <button onClick={() => {
                    props.addItem(data)
                    incrementcount()
                    incrementProduct()
                  }}
                    className=' btn btn-secondary'>Add to cart</button>
                </div>
              </div>
            </div>
          )
          : ""}

        {allElectronics.map((data, i) =>
          <div key={i} className=" col-md-4 my-3 pt-3 ">
            <div className="card bg-carts rounded-4 " >
              <div className=' scale_img'>
                <img className=' w-100 height-img rounded-4 ' src={data.imageCover} alt="" />
              </div>
              <div className="card-body carts">
                <div className=' d-flex justify-content-between'>
                  <h6 className="card-title">{data.name}</h6>
                  <h5 className="card-title text-warning">{data.price} $</h5>
                </div>
                <p className="card-text">{data.description}</p>
              </div>
              <div className=" carts_foter d-flex justify-content-center align-items-center">
                <button onClick={() => {
                  props.addItem(data)
                  incrementcount()
                  incrementProduct()
                }}
                  className=' btn btn-secondary'>Add to cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
