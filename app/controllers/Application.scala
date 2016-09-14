package controllers

import buildinfo.BuildInfo
import play.api._
import play.api.mvc._

class Application extends Controller {

  def index = Action {
    Ok(views.html.index(BuildInfo.name + " is ready!"))
  }

}