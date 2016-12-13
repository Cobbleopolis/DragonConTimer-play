package timer

import javax.inject.Singleton

import akka.actor.Actor
import messages.{StationMessage, StationMessageType}
import models.Station
import sockets.StationSocket

import scala.concurrent.duration._

@Singleton
class TimerActor extends Actor {

    def receive = {
        case time: Duration =>
            Station.store.keys.foreach(Station.tick(time, _))
            StationSocket.broadcast(Station.store.values.map(station => StationMessage(StationMessageType.TIME_UPDATE, station.id, Option(station.time))).toArray)
        case _ => println("Tick")
    }
}
