import React, { useContext, useEffect, useState } from 'react'
import { counterContext } from './Context/Store';

export default function Cart(props) {
  const [products, setProducts] = useState([]);
  let { incrementProduct, price, removeProduct } = useContext(counterContext)

  async function carts() {
    let product = JSON.parse(localStorage.getItem('products'))
    setProducts(product)
  }

  useEffect(() => {
    carts();
  }, [price])

  return (
    <>
      {products.length ?
        <div className=' row'>
          {products.map((data, i) =>
            <div key={i} className=" col-md-4 my-3 pt-3 ">
              <div className="card text-bg-dark rounded-4 " >
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
                  <button
                    onClick={() => {
                      props.addItem(data)
                      incrementProduct()
                      carts()
                    }}
                    className=' btn btn-info px-3'>+</button>
                  <span className=' px-3'>{data.qty}</span>
                  <button
                    onClick={() => {
                      props.deleteItem(data)
                      incrementProduct()
                      carts()
                    }}
                    className=' btn btn-danger px-3'>-</button>
                  <button
                    onClick={() => {
                      removeProduct(data)
                      incrementProduct()
                      carts()
                    }}
                    className=' btn btn-danger px-3 ms-5'><i className="fa-sharp fa-solid fa-trash"></i></button>
                </div>
              </div>
            </div>
          )}
        </div>
        :
        <h1 className=' pt-5 mt-5'>There are no products in the cart</h1>}
    </>
  )
}
