package messages

import messages.StationMessageType.MessageType

case class StationMessage(messageType: MessageType, id: String, updatedTime: Option[Float] = None, updatedName: Option[String] = None, updatedConsole: Option[String] = None, updatedGame: Option[String] = None) {

}
