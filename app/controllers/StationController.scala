package controllers

import javax.inject.Inject

import akka.actor.ActorSystem
import akka.stream.Materializer
import messages.StationMessage
import models._
import play.api.libs.json.Json
import play.api.libs.streams.ActorFlow
import play.api.mvc._
import sockets.StationSocket
import sockets.StationSocket.messageFlowTransformer

class StationController @Inject() (implicit system: ActorSystem, materializer: Materializer) extends Controller {

    val store: Map[String, Station] = Map[String, Station](
        "A" -> Station("A", 3600000f),
        "B" -> Station("B", 3600000f / 2)
    )

    implicit val stationFormat = Json.format[Station]

    def getAll = Action {
        Ok(Json.toJson(store.values))
    }

    def getKeys = Action {
        Ok(Json.toJson(store.keys))
    }

    def get(id: String) = Action {
        if (store.contains(id))
            Ok(Json.toJson(store.get(id)))
        else
            NotFound
    }

    def socket = WebSocket.accept[StationMessage, StationMessage]{ request =>
        ActorFlow.actorRef(out => StationSocket.props(out))
    }

}