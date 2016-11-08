package timer

import javax.inject.Singleton

import akka.actor.Actor
import models.Station

import scala.concurrent.duration._

@Singleton
class TimerActor extends Actor {

    def receive = {
        case time: Duration =>
            Station.store.keys.foreach(Station.tick(time, _))
        case _ => println("Tick")
    }
}
