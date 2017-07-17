package sockets

import akka.actor._
import messages.{StationMessage, StationMessageType}
import models.Station
import play.api.mvc.WebSocket.MessageFlowTransformer
import reference.JsonReference._
import store.StationStore

import scala.collection.mutable.ArrayBuffer

object StationSocket {
    var connectedClients: ArrayBuffer[ActorRef] = ArrayBuffer[ActorRef]()

    def props(out: ActorRef, stationStore: StationStore) = Props(new StationSocket(out, stationStore))

    def broadcast(msg: Array[StationMessage]): Unit = connectedClients.foreach(client => client ! msg)

    implicit val messageFlowTransformer: MessageFlowTransformer[Array[StationMessage], Array[StationMessage]] =
        MessageFlowTransformer.jsonMessageFlowTransformer[Array[StationMessage], Array[StationMessage]]
}

class StationSocket(out: ActorRef, stationStore: StationStore) extends Actor {

    StationSocket.connectedClients += out

    def receive: PartialFunction[Any, Unit] = {
        case msg: Array[StationMessage] =>
            msg.foreach(message => {
                if (message.id == "goodbye")
                    self ! PoisonPill
                val stationOpt: Option[Station] = stationStore.get(message.id)
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

                            stationStore.set(station)

                        case StationMessageType.TIME_RESET =>
                            station.time = Station.MAX_STATION_TIME
                            stationStore.set(station)
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