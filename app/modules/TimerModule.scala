package modules

import com.google.inject.AbstractModule
import play.api.libs.concurrent.AkkaGuiceSupport
import timer.{TimerActor, TimerScheduler}

class TimerModule extends AbstractModule with AkkaGuiceSupport {

    def configure() = {
        bindActor[TimerActor]("timer-actor")
        bind(classOf[TimerScheduler]).asEagerSingleton()
    }

}
