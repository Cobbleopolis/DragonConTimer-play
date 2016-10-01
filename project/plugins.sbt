logLevel := Level.Warn

resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.5.7")

//addSbtPlugin("default" % "sbt-sass" % "0.1.9")

//addSbtPlugin("name.de-vries" % "sbt-typescript" % "0.2.6")

addSbtPlugin("org.irundaia.sbt" % "sbt-sassify" % "1.4.6")

addSbtPlugin("name.de-vries" % "sbt-typescript" % "0.3.0-beta.3")

addSbtPlugin("com.eed3si9n" % "sbt-buildinfo" % "0.6.1")

addSbtPlugin("com.typesafe.sbt" % "sbt-rjs" % "1.0.7")

addSbtPlugin("com.github.stonexx.sbt" % "sbt-babeljs" % "1.0.5")