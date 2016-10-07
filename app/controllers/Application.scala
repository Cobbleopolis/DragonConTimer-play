package controllers

import javax.inject.Inject

import org.webjars.play.RequireJS
import play.api.Mode
import play.api.mvc._

class Application @Inject()(implicit webJarAssets: WebJarAssets, environment: play.api.Environment, config: play.api.Configuration) extends Controller {

    val webpackServer: String = config.underlying.getString("dc-timer.debug.webpack-server")

    def index = Action {
        Ok(views.html.index())
    }

    def jsRouting(file: String) = Action {
        if (environment.mode == Mode.Dev)
            Redirect(webpackServer + file)
        else
            Redirect(routes.Assets.at(file))
    }

}