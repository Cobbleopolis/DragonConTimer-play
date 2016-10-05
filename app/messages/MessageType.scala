package messages

object MessageType extends Enumeration {
    type MessageType = Value
    val ADD = Value(1)
    val UPDATE = Value(2)
    val DELETE = Value(3)
}
