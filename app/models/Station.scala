package models

import store.StationStore

import scala.concurrent.duration.Duration

case class Station(var id: String, var time: Float = 0f, var name: String = "", var consoleOptions: Array[String], var console: String = "", var game: String = "") { //TODO add state (running, paused, in tournament, out of time, etc.)

}

object Station {

    val MAX_STATION_TIME: Float = 3600000f

    def tick(time: Duration, id: String)(implicit stationStore: StationStore): Unit = {
        val stationOpt: Option[Station] = stationStore.get(id)
        if (stationOpt.isDefined) {
            val station: Station = stationOpt.get
            station.time = Math.max(station.time - time.toMillis, 0)
        }
    }
}
