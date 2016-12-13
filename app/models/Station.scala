package models

import scala.collection.SortedMap
import scala.concurrent.duration.Duration

case class Station(var id: String, var time: Float, var name: String = "", var console: String = "", var game: String = "") { //TODO add state (running, paused, in tournament, out of time, etc.)

}

object Station {

    val MAX_STATION_TIME: Float = 3600000f

    var store: SortedMap[String, Station] = SortedMap()
    ('A' to 'Z').foreach(c => store += (c.toString -> Station(c.toString, Math.random().toFloat * MAX_STATION_TIME)))

    def tick(time: Duration, id: String): Unit = {
        val stationOpt: Option[Station] = store.get(id)
        if(stationOpt.isDefined)
            store(id).time -= time.toMillis
    }
}
