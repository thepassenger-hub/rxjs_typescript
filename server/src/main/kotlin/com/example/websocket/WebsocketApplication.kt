package com.example.websocket

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.reactive.asPublisher
import kotlinx.coroutines.reactor.asFlux
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketMessage

import org.springframework.web.reactive.socket.WebSocketSession

import reactor.core.publisher.Mono





@SpringBootApplication
class WebsocketApplication(
    private val webSocketHandler: WebSocketHandler
) {
    @Bean
    fun webSocketHandlerMapping(): HandlerMapping? {
        val map: MutableMap<String, WebSocketHandler?> = HashMap()
        map["/"] = webSocketHandler
        val handlerMapping = SimpleUrlHandlerMapping()
        handlerMapping.order = 1
        handlerMapping.urlMap = map
        return handlerMapping
    }
}

@Component
class ReactiveWebSocketHandler : WebSocketHandler {
    // private fields ...
    val flow = IntRange(0,10000).asFlow().onEach { delay(200) }
    override fun handle(webSocketSession: WebSocketSession): Mono<Void> {
        return webSocketSession.send(flow
            .map { payload: Int -> println(payload);webSocketSession.textMessage(payload.toString()) }.asFlux(Dispatchers.IO))
            .and(webSocketSession.receive()
                .map { obj: WebSocketMessage -> obj.payloadAsText }
                .log())
    }
}

fun main(args: Array<String>) {
    runApplication<WebsocketApplication>(*args)
}
