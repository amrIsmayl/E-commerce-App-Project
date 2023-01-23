import { createContext, useState } from "react";

export let counterContext = createContext()

export default function CounterContextProvider(props) {

    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);

    function incrementProduct() {
        let product = JSON.parse(localStorage.getItem("products"))
        if (product) {
            setCount(product.length)
            let totalPrice = 0
            product.map((elm) => totalPrice += elm.price * elm.qty)
            setPrice(totalPrice)
        }

    }
    return <counterContext.Provider value={{ count, price, incrementProduct }}>
        {props.children}
    </counterContext.Provider>
}