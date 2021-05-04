defmodule TrackingthegodsWeb.RiotConfigController do
  use TrackingthegodsWeb, :controller

  alias Trackingthegods.Repo
  alias Trackingthegods.Models.RiotConfig

  def update(conn, params = %{"password" => "pagel"} = params) do
    key = params["key"]
    # key2 = params["key2"]
    # key3 = params["key3"]

    config = RiotConfig.get_config()

    RiotConfig.changeset(config, %{key: key})
    |> Repo.update()

    GenServer.call(Trackingthegods.Jobs.RiotConfig, :update)

    Plug.Conn.send_resp(conn, :no_content, "")
  end
end
