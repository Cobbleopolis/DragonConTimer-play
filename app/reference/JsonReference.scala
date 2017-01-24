package reference

import messages.StationMessageType.MessageType
import messages.{StationMessage, StationMessageType}
import models._
import play.api.libs.json._

object JsonReference {

    implicit val stationFormat: OFormat[Station] = Json.format[Station]

    implicit val stationMessageTypeFormat = new Format[MessageType] {
        def reads(json: JsValue) = JsSuccess(StationMessageType.apply(json.as[Int]))
        def writes(messageType: MessageType) = JsNumber(messageType.id)
    }

    implicit val stationMessageFormat: OFormat[StationMessage] = Json.format[StationMessage]

    implicit val gameFormat: OFormat[Game] = Json.format[Game]

    implicit val consoleFormat: OFormat[Console] = Json.format[Console]

}
