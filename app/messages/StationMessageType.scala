package messages

object StationMessageType extends Enumeration {
    type MessageType = Value
    val TIME_UPDATE = Value(1)
    val FIELD_UPDATE = Value(2)
    val TIME_RESET = Value(3)
    val TIME_ZERO = Value(4)
}
