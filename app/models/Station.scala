package models

import messages.{MessageType, StationMessage}
import sockets.StationSocket

import scala.collection.SortedMap
import scala.concurrent.duration.Duration

case class Station(var id: String, var time: Float, var name: String = "", var console: String = "", var game: String = "") { //TODO add state (running, paused, in tournament, out of time, etc.)

}

object Station {
    var store: SortedMap[String, Station] = SortedMap()
    ('A' to 'Z').foreach(c => store += (c.toString -> Station(c.toString, Math.random().toFloat * 3600000f)))

    def tick(time: Duration, id: String): Unit = {
        store(id).time -= time.toMillis
        StationSocket.broadcast(StationMessage(MessageType.UPDATE, id, store(id))) //TODO read from a config
    }
}
