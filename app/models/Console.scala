package models

import play.api.cache.CacheApi

case class Console(id: String, name: String, games: Array[String]) {

}

object Console {

    def lookup(id: String)(implicit cache: CacheApi): Console = cache.get(id).get
}