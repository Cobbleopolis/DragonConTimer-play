import java.net.InetSocketAddress

import play.sbt.PlayRunHook
import sbt._

object Webpack {
    def apply(base: File): PlayRunHook = {
        object WebpackHook extends PlayRunHook {
            var process: Option[Process] = None

            override def beforeStarted() = {
                if (!(base / "node_modules").exists)
                    process = Option(
                        Process(getCommand("npm", "install", "&", "webpack"), base).run()
                    )
                else
                    process = Option(
                        Process(getCommand("webpack"), base).run()
                    )
            }

            override def afterStarted(addr: InetSocketAddress) = {
                process = Option(
                    Process(getCommand("webpack-dev-server", "--hot", "--inline"), base).run()
                )
            }

            override def afterStopped() = {
                process.foreach(_.destroy())
                if (isWindows)
                    Process("cmd /c taskkill /F /IM node.exe").run()
                process = None
            }
        }

        WebpackHook
    }

    def isWindows: Boolean = scala.sys.props("os.name").toLowerCase.contains("windows")

    def getCommand(command: String*): String = {
        if (isWindows)
            (Seq("cmd", "/C") ++ command).mkString(" ")
        else
            command.mkString(" ")
    }
}