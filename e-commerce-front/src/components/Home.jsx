import React, { useContext, useState } from 'react';
import { counterContext } from './Context/Store';


export default function Home(props) {
  const [searchProduct, setSearchProduct] = useState([]);
  let { incrementProduct, allProduct } = useContext(counterContext);

  function searchByProducer(e) {
    let term = e.target.value;

    let searchResult = [];

    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].name.toUpperCase().includes(term.toUpperCase()) === true && term) {
        searchResult.push(allProduct[i]);
      }
    }
    setSearchProduct(searchResult);
  }

  return (
    <>
      <div className=' row d-flex justify-content-center pt-5'>

        <div className=' col-md-5 pt-5'>
          <h2 className=' p-2 '>All Products</h2>
          <p className=' p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat deserunt reiciendis laudantium doloremque alias ipsum!</p>

        </div>
        <div className=' col-md-7 px-4 pt-5'>
          <h1 className=' pb-3 pt-3'>search by Producer</h1>
          <input onInput={searchByProducer} type="text" className=' w-100 bg-secondary text-white' />
        </div>

        {searchProduct.length > 0 ?
          searchProduct.map((data, i) =>
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
                  <button className=' btn btn-secondary'>Add to cart</button>
                </div>
              </div>
            </div>
          )
          : ""}

        {allProduct.map((data, i) =>
          <div key={i} className=" col-md-4 my-3 pt-3 ">
            <div className="card bg-carts rounded-4" >
              <div className=' scale_img'>
                <img className=' w-100 height-img rounded-4' src={data.imageCover} alt="" />
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


