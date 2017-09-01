package controllers

import javax.inject.Inject

import com.typesafe.config.Config
import controllers.Application.JsBase
import play.api.Mode
import play.api.libs.ws.WSClient
import play.api.mvc._

import scala.concurrent.ExecutionContext

class Application @Inject()(implicit webJarAssets: WebJarAssets, environment: play.api.Environment, cfg: play.api.Configuration, ws: WSClient, context: ExecutionContext) extends Controller {

    val config: Config = cfg.underlying

    val webpackServerIsSecure: Boolean = config.getBoolean("dc-timer.debug.webpack-server.isSecure")
    val webpackServerPort: Int = config.getInt("dc-timer.debug.webpack-server.port")
    val webpackServerContentPath: String = config.getString("dc-timer.debug.webpack-server.contentPath")

    val webpackServerFormat: String = s"http${if (webpackServerIsSecure) "s" else ""}://%s:$webpackServerPort/$webpackServerContentPath"

    def index = Action { implicit request =>
        implicit val jsPath: JsBase = if (environment.mode == Mode.Dev) webpackServerFormat.format(request.domain) else routes.Assets.at("/javascripts/").url
        Ok(views.html.index())
    }

}

object Application {

    type JsBase = String

}