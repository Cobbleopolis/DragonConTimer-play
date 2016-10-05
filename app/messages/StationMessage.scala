package messages

import messages.MessageType.MessageType
import models.Station

case class StationMessage(messageType: Int, id: String, station: Station) {

}
