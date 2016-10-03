package sockets

import akka.actor._

object StationSocket {
    def props(out: ActorRef) = Props(new StationSocket(out))
}

class StationSocket(out: ActorRef) extends Actor {
    def receive = {
        case msg: String =>
            out ! ("I received your message: " + msg)
    }
}