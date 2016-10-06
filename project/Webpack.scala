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
                        Process(getCommand("npm", "install"), base).run()
                    )
            }

            override def afterStarted(addr: InetSocketAddress) = {
                process = Option(
                    Process(getCommand("webpack", "--watch"), base).run()
                )
            }

            def getCommand(command: String*): String = {
                scala.sys.props("os.name").toLowerCase match {
                    case osName if osName contains "windows" => (Seq("cmd", "/C") ++ command).mkString(" ")
                    case _ => command.mkString(" ")
                }
            }

            override def afterStopped() = {
                process.foreach(_.destroy())
                process = None
            }
        }

        WebpackHook
    }
}