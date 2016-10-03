val appName: String = "DragonCon Timer"

val appVersion: String = "1.0"

val appScalaVersion: String = "2.11.7"

val reactVersion: String = "15.3.2"

val baseDependencies = Seq(
    jdbc,
    cache,
    ws,
    specs2 % Test
)

val webJars = Seq (
    "org.webjars" %% "webjars-play" % "2.5.0",
    "org.webjars" % "bootstrap-sass" % "3.3.1-1",
    "org.webjars" % "jquery" % "2.2.2",
    "org.webjars.bower" % "font-awesome-sass" % "4.6.2",
    "org.webjars.npm" % "requirejs" % "2.3.2",
    "org.webjars.bower" % "socket.io-client" % "1.4.5"
)

val reactJars = Seq(
    "org.webjars.npm" % "react" % reactVersion,
    "org.webjars.npm" % "react-dom" % reactVersion,
    "org.webjars.npm" % "react-bootstrap" % "0.30.3"
)

val otherDependencies = Seq(
    "com.adrianhurt" %% "play-bootstrap" % "1.0-P25-B3" exclude("org.webjars", "jquery"),
    "org.mindrot" % "jbcrypt" % "0.3m"
)

lazy val `dragoncontimer` = (project in file(".")).enablePlugins(PlayScala, DebianPlugin, BuildInfoPlugin).settings(
    name := appName,
    version := appVersion,
    scalaVersion := appScalaVersion,
    libraryDependencies ++= baseDependencies ++ webJars ++ reactJars ++ otherDependencies,
    unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" ),
    resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases",
    resolveFromWebjarsNodeModulesDir := true,
    typingsFile := Some(baseDirectory.value / "app" / "assets" / "javascripts" / "typings" / "index.d.ts"),
    maintainer in Linux := "Logan Thompson <cobbleopolis@gmail.com>",
    packageSummary in Linux := "DragonCon Timer server",
    packageDescription := "A play server to run a DragonCon Timer instance",
    (testOptions in Test) += Tests.Argument(TestFrameworks.ScalaTest, "-h", "target/report"),
    JsEngineKeys.engineType := JsEngineKeys.EngineType.Node,
    pipelineStages := Seq(rjs)
    //    bashScriptExtraDefines += """addJava "-Dconfig.file=${app_home}/../conf/production.conf""""
)