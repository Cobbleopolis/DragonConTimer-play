package controllers

import models.Station
import play.api.libs.json.Json
import play.api.mvc._

class StationController extends Controller {

    val store: Map[String, Station] = Map[String, Station](
        "A" -> Station("A", 3600000f),
        "B" -> Station("B", 3600000f / 2)
    )

    implicit val stationFormat = Json.format[Station]

    def getAll = Action {
        Ok(Json.toJson(store.values))
    }

    def get(id: String) = Action {
        if (store.contains(id))
            Ok(Json.toJson(store.get(id)))
        else
            NotFound
    }

}