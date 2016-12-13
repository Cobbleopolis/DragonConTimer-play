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

    implicit val stationFormat = Json.format[Station]

    def getAll = Action {
        Ok(Json.toJson(Station.store))
    }

    def getKeys = Action {
        Ok(Json.toJson(Station.store.keys))
    }

    def get(id: String) = Action {
        if (Station.store.contains(id))
            Ok(Json.toJson(Station.store.get(id)))
        else
            NotFound
    }

    def socket = WebSocket.accept[Array[StationMessage], Array[StationMessage]]{ request =>
        ActorFlow.actorRef(out => StationSocket.props(out))
    }

}