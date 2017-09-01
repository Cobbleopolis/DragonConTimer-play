package controllers

import javax.inject.Inject

import models.Console
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import reference.JsonReference._
import store.ConsoleStore

class ConsoleController @Inject()(consoleStore: ConsoleStore) extends Controller {

    def get(id: String) = Action {
        val consoleOpt: Option[Console] = consoleStore.get(id)
        if (consoleOpt.isDefined)
            Ok(Json.prettyPrint(Json.toJson(consoleOpt.get)))
        else
            NotFound("Unable to find console: " + id)
    }

    def getAll = Action {
        Ok(Json.prettyPrint(Json.toJson(consoleStore.getAll)))
    }

}
