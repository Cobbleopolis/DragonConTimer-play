package messages

import messages.MessageType.MessageType
import models.Station

case class StationMessage(messageType: MessageType, id: String, station: Station) {

}
