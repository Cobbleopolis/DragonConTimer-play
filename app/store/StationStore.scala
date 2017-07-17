package store

import javax.inject.{Inject, Singleton}

import com.google.inject.ImplementedBy
import models.Station
import play.api.{Configuration, Logger}

import scala.collection.mutable

@ImplementedBy(classOf[ConsoleStoreImpl])
trait StationStore {

    def set(station: Station): Unit

    def get(id: String): Option[Station]

    def getAll: Array[Station]

    def map: Map[String, Station]

    def keys: Array[String]

    def contains(id: String): Boolean
}

@Singleton
class StationStoreImpl @Inject()(config: Configuration) extends StationStore {

    private val stations: mutable.Map[String, Station] = mutable.Map[String, Station]()

    if(config.getConfigSeq("dc-timer.stations").isEmpty)
        Logger.error("Stations config not defined!")

    private val stationsSeq: Seq[Station] = config.getConfigSeq("dc-timer.stations").get.map(conf =>
        Station(
            id = conf.getString("id").get,
            consoleOptions = conf.getStringSeq("consoleOptions").get.toArray
        )
    )

    stationsSeq.foreach(station => stations += (station.id -> station))

    def set(station: Station): Unit = stations += (station.id -> station)

    def get(id: String): Option[Station] = stations.get(id)

    def getAll: Array[Station] = stations.values.toArray

    def map: Map[String, Station] = stations.toMap

    def keys: Array[String] = stations.keys.toArray

    def contains(id: String): Boolean = stations.contains(id)
}
