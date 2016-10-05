package sockets

import akka.actor._
import messages.{MessageType, StationMessage}
import models.Station
import play.api.mvc.WebSocket.MessageFlowTransformer
import reference.JsonReference._

import scala.collection.mutable.ArrayBuffer

object StationSocket {
    var connectedClients: ArrayBuffer[ActorRef] = ArrayBuffer[ActorRef]()

    def props(out: ActorRef) = Props(new StationSocket(out))

    def broadcast(msg: StationMessage) = connectedClients.foreach(client => client ! msg)

    implicit val messageFlowTransformer = MessageFlowTransformer.jsonMessageFlowTransformer[StationMessage, StationMessage]
}

class StationSocket(out: ActorRef) extends Actor {

    StationSocket.connectedClients += out

    out ! StationMessage(1, "A", Station("A", 3600000))

    def receive = {
        case msg: StationMessage =>
            if (msg.id == "goodbye")
                self ! PoisonPill
            StationSocket.broadcast(msg)
    }

    override def postStop(): Unit = {
        super.postStop()
        StationSocket.connectedClients.remove(StationSocket.connectedClients.indexOf(out))
    }
}