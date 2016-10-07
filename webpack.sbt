lazy val webpack = taskKey[Unit]("webpack")

def runWebpack(file: File) = {
    Process(Webpack.getCommand("webpack", "-p", "--config", "webpack.production.config.js"), file) !
}

webpack := {
    if (runWebpack(baseDirectory.value) != 0) throw new Exception("Something goes wrong when running webpack.")
}

dist <<= dist dependsOn webpack

stage <<= stage dependsOn webpack

test <<= (test in Test) dependsOn webpack