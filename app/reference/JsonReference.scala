package reference

import messages.MessageType.MessageType
import messages.{MessageType, StationMessage}
import models._
import play.api.libs.json._

object JsonReference {

    implicit val stationFormat = Json.format[Station]

    implicit val stationMessageTypeFormat = new Format[MessageType] {
        def reads(json: JsValue) = JsSuccess(MessageType.apply(json.as[Int]))
        def writes(messageType: MessageType) = JsNumber(messageType.id)
    }

    implicit val stationMessageFormat = Json.format[StationMessage]

}
