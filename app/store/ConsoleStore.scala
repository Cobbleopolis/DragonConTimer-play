package store

import java.io.FileInputStream
import javax.inject.{Inject, Singleton}

import com.google.inject.ImplementedBy
import models.Console
import play.api.libs.json.Json
import play.api.{Configuration, Environment}
import reference.JsonReference._

import scala.collection.mutable

@ImplementedBy(classOf[ConsoleStoreImpl])
trait ConsoleStore {

    def get(id: String): Option[Console]

    def getAll: Array[Console]
}

@Singleton
class ConsoleStoreImpl @Inject()(config: Configuration, env: Environment) extends  ConsoleStore {

    private val consoles: mutable.Map[String, Console] = mutable.Map[String, Console]()

    private val consoleDefPath: String = config.getString("dc-timer.definitionFiles.consolePath").getOrElse("conf/consoles.json")

    private val consoleDefStream: FileInputStream = new FileInputStream(env.getFile(consoleDefPath))

    private val consoleArray: Array[Console] = try {
        Json.parse(consoleDefStream).as[Array[Console]]
    } finally {
        consoleDefStream.close()
    }

    consoleArray.foreach(console => consoles += (console.id -> console))

    def get(id: String): Option[Console] = consoles.get(id)

    def getAll: Array[Console] = consoles.values.toArray
}
