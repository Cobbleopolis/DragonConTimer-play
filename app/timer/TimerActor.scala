package timer

import javax.inject.{Inject, Singleton}

import akka.actor.Actor
import messages.{StationMessage, StationMessageType}
import models.Station
import sockets.StationSocket
import store.StationStore

import scala.concurrent.duration._

@Singleton
class TimerActor @Inject()(implicit stationStore: StationStore) extends Actor {

    def receive = {
        case time: Duration =>
            stationStore.keys.foreach(Station.tick(time, _))
            StationSocket.broadcast(stationStore.getAll.map(station => StationMessage(StationMessageType.TIME_UPDATE, station.id, Option(station.time))))
        case _ => println("Tick")
    }
}
