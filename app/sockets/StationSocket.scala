package sockets

import akka.actor._

import scala.collection.mutable.ArrayBuffer

object StationSocket {
    var connectedClients: ArrayBuffer[ActorRef] = ArrayBuffer[ActorRef]()

    def props(out: ActorRef) = Props(new StationSocket(out))

    def broadcast(msg: String) = connectedClients.foreach(client => client ! msg)
}

class StationSocket(out: ActorRef) extends Actor {

    StationSocket.connectedClients += out

    def receive = {
        case msg: String =>
            if (msg == "goodbye")
                self ! PoisonPill
            StationSocket.broadcast(msg)
    }

    override def postStop(): Unit = {
        super.postStop()
        StationSocket.connectedClients.remove(StationSocket.connectedClients.indexOf(out))
    }
}