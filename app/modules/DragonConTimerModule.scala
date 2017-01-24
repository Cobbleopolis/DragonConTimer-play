package modules

import com.google.inject.AbstractModule
import play.api.libs.concurrent.AkkaGuiceSupport
import store.{ConsoleStore, ConsoleStoreImpl}
import timer.{TimerActor, TimerScheduler}

class DragonConTimerModule extends AbstractModule with AkkaGuiceSupport {

    def configure(): Unit = {
        bindActor[TimerActor]("timer-actor")
        bind(classOf[TimerScheduler]).asEagerSingleton()
        bind(classOf[ConsoleStore]).to(classOf[ConsoleStoreImpl]).asEagerSingleton()
    }

}
