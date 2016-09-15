logLevel := Level.Warn

resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.5.7")

//addSbtPlugin("default" % "sbt-sass" % "0.1.9")

addSbtPlugin("org.irundaia.sbt" % "sbt-sassify" % "1.4.6")

addSbtPlugin("name.de-vries" % "sbt-typescript" % "0.3.0-beta.3")

addSbtPlugin("com.eed3si9n" % "sbt-buildinfo" % "0.6.1")

addSbtPlugin("net.virtual-void" % "sbt-dependency-graph" % "0.8.2")