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

    var store: Map[String, Station] = Map(('A' to 'Z').map(c => c.toString -> Station(c.toString, Math.random().toFloat * 3600000f)): _*)
}

class StationSocket(out: ActorRef) extends Actor {

    StationSocket.connectedClients += out

    StationSocket.store.foreach {
        case (key: String, value: Station) => out ! StationMessage(1, key, value)
    }

    def receive = {
        case msg: StationMessage =>
            if (msg.id == "goodbye")
                self ! PoisonPill
            msg.messageType match {
                case 2 =>
                    StationSocket.store += (msg.id -> msg.station)
            }
            StationSocket.broadcast(StationMessage(2, msg.id, StationSocket.store(msg.id)))
    }

    override def postStop(): Unit = {
        super.postStop()
        StationSocket.connectedClients.remove(StationSocket.connectedClients.indexOf(out))
    }
}