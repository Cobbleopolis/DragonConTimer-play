package reference

import messages.StationMessage
import models._
import play.api.libs.json.Json

object JsonReference {

    implicit val stationFormat = Json.format[Station]

    implicit val stationMessageFormat = Json.format[StationMessage]

}
