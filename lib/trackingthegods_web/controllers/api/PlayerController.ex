defmodule TrackingthegodsWeb.PlayerController do
  use TrackingthegodsWeb, :controller

  def index(conn, _params) do
    players = GenServer.call(Trackingthegods.Jobs.Rank, :get)

    render(conn, "index.json", players: players)
  end
end
