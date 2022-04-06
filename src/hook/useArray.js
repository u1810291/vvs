import { useState } from "react";


export default function useArray(props) {
    const [array, setArray] = useState(props);

    function push(element) {
        setArray([...array, element]);
    }

    function filter(callback) {
        setArray(array.filter(callback));
    }
    function pop(index) {
        setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length -1)]);
    }

    return { array, push, filter, pop };
}