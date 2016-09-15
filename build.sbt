val appName: String = "DragonCon Timer"

val appVersion: String = "1.0"

val appScalaVersion: String = "2.11.7"

val ngVersion: String = "2.0.0-rc.7"

val baseDependencies = Seq(
    jdbc,
    cache,
    ws,
    specs2 % Test
)

val webJars = Seq (
    "org.webjars" %% "webjars-play" % "2.5.0",
    "org.webjars.npm" % "bootstrap-sass" % "3.3.7",
    "org.webjars" % "jquery" % "2.2.2",
    "org.webjars.bower" % "font-awesome-sass" % "4.6.2"
)

val angularJars = Seq(
    "org.webjars.npm" % "angular__common" % ngVersion,
    "org.webjars.npm" % "angular__compiler" % ngVersion,
    "org.webjars.npm" % "angular__core" % ngVersion,
    "org.webjars.npm" % "angular__forms" % ngVersion,
    "org.webjars.npm" % "angular__http" % ngVersion,
    "org.webjars.npm" % "angular__platform-browser" % ngVersion,
    "org.webjars.npm" % "angular__platform-browser-dynamic" % ngVersion,
    "org.webjars.npm" % "angular__router" % "3.0.0-rc.3",
    "org.webjars.npm" % "angular__upgrade" % ngVersion,
    "org.webjars.npm" % "reflect-metadata" % "0.1.8",
    "org.webjars.npm" % "rxjs" % "5.0.0-beta.12",
    "org.webjars.npm" % "systemjs" % "0.19.38",
    "org.webjars.npm" % "zone.js" % "0.6.21",
    "org.webjars.npm" % "angular2-in-memory-web-api" % "0.0.19"
)

val otherDependencies = Seq(
    "com.adrianhurt" %% "play-bootstrap" % "1.0-P25-B3" exclude("org.webjars", "jquery"),
    "org.mindrot" % "jbcrypt" % "0.3m"
)

lazy val `dragoncontimer` = (project in file(".")).enablePlugins(PlayScala, DebianPlugin, BuildInfoPlugin).settings(
    name := appName,
    version := appVersion,
    scalaVersion := appScalaVersion,
    libraryDependencies ++= baseDependencies ++ webJars ++ angularJars ++ otherDependencies,
    unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" ),
    resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases",
    resolveFromWebjarsNodeModulesDir := true,
    typingsFile := Some(baseDirectory.value / "app" / "assets" / "javascripts" / "typings" / "index.d.ts"),
    maintainer in Linux := "Logan Thompson <cobbleopolis@gmail.com>",
    packageSummary in Linux := "DragonCon Timer server",
    packageDescription := "A play server to run a DragonCon Timer instance",
    (testOptions in Test) += Tests.Argument(TestFrameworks.ScalaTest, "-h", "target/report")
//    bashScriptExtraDefines += """addJava "-Dconfig.file=${app_home}/../conf/production.conf""""
)