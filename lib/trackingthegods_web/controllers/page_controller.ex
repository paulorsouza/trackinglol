defmodule TrackingthegodsWeb.PageController do
  use TrackingthegodsWeb, :controller

  @env Mix.env()
  @version Mix.Project.config()[:version]

  def index(conn, _params) do
    render(conn, "index.html", env: @env, version: @version)
  end
end
