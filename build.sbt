import sbt.Keys._

val appName: String = "DragonCon Timer"
val appVersion: String = "1.1.0"
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
    "org.webjars" % "jquery" % "2.2.2"
)
val reactJars = Seq(
    "org.webjars.npm" % "react" % reactVersion,
    "org.webjars.npm" % "react-dom" % reactVersion
)
val otherDependencies = Seq(
    "com.adrianhurt" %% "play-bootstrap" % "1.0-P25-B3" exclude("org.webjars", "jquery"),
    "org.mindrot" % "jbcrypt" % "0.3m"
)

lazy val webpack = taskKey[Unit]("webpack")

def runWebpack(file: File) = {
    Process(Webpack.getCommand("webpack", "-p", "--config", "webpack.production.config.js"), file, "NODE_ENV" -> "production") !
}

webpack := {
    if (runWebpack(baseDirectory.value) != 0) throw new Exception("Something goes wrong when running webpack.")
}

lazy val `dragoncontimer` = (project in file(".")).enablePlugins(PlayScala, DebianPlugin, WindowsPlugin, BuildInfoPlugin).settings(
    name := appName,
    version := appVersion,
    scalaVersion := appScalaVersion,
    libraryDependencies ++= baseDependencies ++ webJars ++ reactJars ++ otherDependencies,
    unmanagedResourceDirectories in Test <+= baseDirectory(_ / "target/web/public/test"),
    resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases",
    maintainer in Linux := "Logan Thompson <cobbleopolis@gmail.com>",
    packageSummary in Linux := "DragonCon Timer server",
    packageDescription := "A play server to run a DragonCon Timer instance",
    (testOptions in Test) += Tests.Argument(TestFrameworks.ScalaTest, "-h", "target/report"),
    JsEngineKeys.engineType := JsEngineKeys.EngineType.Node,
    PlayKeys.playRunHooks <+= baseDirectory.map(Webpack.apply),
    excludeFilter in(Assets, JshintKeys.jshint) := "*.js",
    watchSources ~= { (ws: Seq[File]) =>
        ws filterNot { path =>
            path.getName.endsWith(".tsx") || path.getName == "app"
        }
    },
    pipelineStages := Seq(digest, gzip),
    dist <<= dist dependsOn webpack,
    stage <<= stage dependsOn webpack,
    test <<= (test in Test) dependsOn webpack
    //    bashScriptExtraDefines += """addJava "-Dconfig.file=${app_home}/../conf/production.conf""""
)