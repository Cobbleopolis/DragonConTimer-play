package controllers

import javax.inject.Inject

import org.webjars.play.RequireJS
import play.api.mvc._

class Application @Inject()(implicit webJarAssets: WebJarAssets, requireJS: RequireJS) extends Controller {

    def index = Action {
        Ok(views.html.index(buildinfo.BuildInfo.name + " is ready!"))
    }

}