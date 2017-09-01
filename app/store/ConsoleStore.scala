package store

import javax.inject.{Inject, Singleton}

import com.google.inject.ImplementedBy
import models.Console
import play.api.{Configuration, Logger}

import scala.collection.mutable

@ImplementedBy(classOf[ConsoleStoreImpl])
trait ConsoleStore {

    def get(id: String): Option[Console]

    def getAll: Array[Console]
}

@Singleton
class ConsoleStoreImpl @Inject()(config: Configuration) extends ConsoleStore {

    private val consoles: mutable.Map[String, Console] = mutable.Map[String, Console]()

    if(config.getConfigSeq("dc-timer.consoles").isEmpty)
        Logger.error("Console config not defined!")

    private val consoleSeq: Seq[Console] = config.getConfigSeq("dc-timer.consoles").get.map(conf =>
        Console(
            id = conf.getString("id").get,
            name = conf.getString("name").get,
            games = conf.getStringSeq("games").getOrElse(Seq()).toArray
        )
    )

    consoleSeq.foreach(console => consoles += (console.id -> console))

    def get(id: String): Option[Console] = consoles.get(id)

    def getAll: Array[Console] = consoles.values.toArray
}
