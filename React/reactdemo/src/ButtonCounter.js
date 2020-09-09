import React , {useState} from 'react'

export default function ButtonCounter(props) {
  let [count,setCount] = useState(0)

  function dec() {
    setCount(count - 1)
  }
  function inc() { 
    setCount(count + 1)
  }
  return (
    <div>
      <button onClick={dec}>-</button>
      <span>{count}</span>
      <button onClick={inc}>+</button>
    </div>
  )
}
