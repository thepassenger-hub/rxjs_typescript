import { useEffect } from "react"
import { useState } from "react"
import { WebSocketSubject } from "rxjs/webSocket"
import { sample, interval } from "rxjs"
export const useWebSocket = (props: {ws: WebSocketSubject<String>}) => {
    const [isReceiving, setIsReceiving] = useState(false)

    useEffect( () => {
        props.ws.pipe(sample(interval(1000))).subscribe(
            //   props.ws.pipe(delay()).subscribe(
                {
                    next: (v) => setIsReceiving(true),
                    error: (e) => setIsReceiving(false),
                    complete: () => setIsReceiving(false) 
                }
              )
            })
        return isReceiving
}