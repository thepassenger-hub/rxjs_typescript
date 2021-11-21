import { bind, Subscribe } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import { useEffect } from "react";
import { useState } from 'react';
import { interval, timer } from "rxjs";
import { map, debounce, throttle, sample, delay } from "rxjs/operators"
import { webSocket, WebSocketSubject} from "rxjs/webSocket" 
import { useWebSocket } from "./useWebSocket";
// textchange = flow
// set text = emit() nel flow
const [textChange$, setText] = createSignal<String>();

// usetext = hook
// text = flow  
// bind returns a tuple that contains the hook, 
// plus the underlying shared observable so it can be used by other streams:
const [useText, text$] = bind(textChange$, "")
const [useCharCount, charCount$] = bind(text$.pipe(map(elem => elem+"asd")))

export function Test(props: {ws: WebSocketSubject<String>}) {
//   const [ws, setWs] = useState(
  const isReceiving = useWebSocket(props)
  console.log(isReceiving)
useEffect (() => {

  props.ws.pipe(sample(interval(1000))).subscribe(
//   props.ws.pipe(delay()).subscribe(
    {
        next: (v) => setText(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    }
  )
}, [])

  const text = useText()
  const mod = useCharCount()
  return (
    <div>
       <h1>{text}</h1>
        <h2> {mod}</h2>
        <h3>{isReceiving ? "ok" : "not ok"}</h3>
      <button onClick={e => setText((Math.random()*1000).toString())}>PIGIAMI</button>
    </div>
  )

}