import { useState } from "react";


export default function useArray(props) {
    const [array, setArray] = useState(props);

    function push(element) {
        setArray([...array, element]);
    }

    function filter(callback) {
        setArray(array.filter(callback));
    }

    function update(index, newElement) {
        setArray(a => [
            ...a.slice(0, index),
            newElement,
            ...a.slice(index + 1, a.length -1),
        ])
    }

    function remove(index) {
        setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length -1)]);
    }

    function clear() {
        setArray([]);
    }

    return { array, set: setArray, push, filter, update, remove, clear };
}