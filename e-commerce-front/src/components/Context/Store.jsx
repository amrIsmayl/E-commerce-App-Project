import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export let counterContext = createContext()

export default function CounterContextProvider(props) {

    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [allProduct, setAllProduct] = useState([]);
    
    useEffect(() => {
        getProduct();
    }, [])

    function removeProduct(data) {
        let product = JSON.parse(localStorage.getItem("products"))
        let cart = product.filter((elm) => elm.id !== data.id)
        localStorage.setItem("products", JSON.stringify(cart))
    }

    async function getProduct() {
        let { data } = await axios.get('http://localhost:5000/product/');
        setAllProduct(data.result)
    }

    function incrementProduct() {
        let product = JSON.parse(localStorage.getItem("products"))
        if (product) {
            setCount(product.length)
            let totalPrice = 0
            product.map((elm) => totalPrice += elm.price * elm.qty)
            setPrice(totalPrice)
        }
    }

    async function incrementcount() {
        let products = JSON.parse(localStorage.getItem("products"))
        let tokens = localStorage.getItem("userToken");
        await axios.patch("http://localhost:5000/wishlist", products, { headers: { "token": tokens } });
    }

    return <counterContext.Provider value={{ count, price, incrementProduct, getProduct, allProduct, incrementcount, removeProduct }}>
        {props.children}
    </counterContext.Provider>
}