package timer

import javax.inject.{Inject, Named}

import akka.actor.{ActorRef, ActorSystem}

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

class TimerScheduler @Inject() (val system: ActorSystem, @Named("timer-actor") val timerActor: ActorRef)(implicit ex: ExecutionContext) {

    val sourceScheduler = system.scheduler.schedule(0.milliseconds, 1.minute, timerActor, 1.minute) //TODO make time configurable
}
