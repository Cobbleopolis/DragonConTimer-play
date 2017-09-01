package controllers

import javax.inject.Inject

import akka.actor.ActorSystem
import akka.stream.Materializer
import messages.StationMessage
import models._
import play.api.libs.json.{Json, OFormat}
import play.api.libs.streams.ActorFlow
import play.api.mvc._
import sockets.StationSocket
import sockets.StationSocket.messageFlowTransformer
import store.StationStore

class StationController @Inject() (implicit system: ActorSystem, materializer: Materializer, stationStore: StationStore) extends Controller {

    implicit val stationFormat: OFormat[Station] = Json.format[Station]

    def getAll = Action {
        Ok(Json.toJson(stationStore.map))
    }

    def getKeys = Action {
        Ok(Json.toJson(stationStore.keys))
    }

    def get(id: String) = Action {
        if (stationStore.contains(id))
            Ok(Json.toJson(stationStore.get(id)))
        else
            NotFound
    }

    def socket: WebSocket = WebSocket.accept[Array[StationMessage], Array[StationMessage]]{ _ =>
        ActorFlow.actorRef(out => StationSocket.props(out, stationStore))
    }

}