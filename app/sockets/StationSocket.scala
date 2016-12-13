package sockets

import akka.actor._
import messages.{StationMessage, StationMessageType}
import models.Station
import play.api.mvc.WebSocket.MessageFlowTransformer
import reference.JsonReference._

import scala.collection.mutable.ArrayBuffer

object StationSocket {
    var connectedClients: ArrayBuffer[ActorRef] = ArrayBuffer[ActorRef]()

    def props(out: ActorRef) = Props(new StationSocket(out))

    def broadcast(msg: Array[StationMessage]) = connectedClients.foreach(client => client ! msg)

    implicit val messageFlowTransformer = MessageFlowTransformer.jsonMessageFlowTransformer[Array[StationMessage], Array[StationMessage]]
}

class StationSocket(out: ActorRef) extends Actor {

    StationSocket.connectedClients += out

    def receive = {
        case msg: Array[StationMessage] =>
            msg.foreach(message => {
                if (message.id == "goodbye")
                    self ! PoisonPill
                val stationOpt: Option[Station] = Station.store.get(message.id)
                if(stationOpt.isDefined) {
                    val station = stationOpt.get
                    message.messageType match {
                        case StationMessageType.FIELD_UPDATE =>
                            val nameOpt: Option[String] = message.updatedName
                            val consoleOpt: Option[String] = message.updatedConsole
                            val gameOpt: Option[String] = message.updatedGame

                            station.name = nameOpt.getOrElse(station.name)
                            station.console = consoleOpt.getOrElse(station.console)
                            station.game = gameOpt.getOrElse(station.game)

                            Station.store += (message.id -> station)

                        case StationMessageType.TIME_RESET =>
                            station.time = Station.MAX_STATION_TIME
                            Station.store += (message.id -> station)
                    }
                }
            })

            StationSocket.broadcast(msg)
    }

    override def postStop(): Unit = {
        super.postStop()
        StationSocket.connectedClients.remove(StationSocket.connectedClients.indexOf(out))
    }
}