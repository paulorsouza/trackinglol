defmodule TrackingthegodsWeb.PlayerController do
  use TrackingthegodsWeb, :controller

  alias Trackingthegods.Client.Riot

  def index(conn, _params) do
    metadata = Riot.getMetaData()

    tin = Riot.getData(metadata.tin, metadata.tin.name)
    brtt = Riot.getData(metadata.brtt, metadata.brtt.name)
    cariok = Riot.getData(metadata.cariok, metadata.cariok.name)
    robo = Riot.getData(metadata.robo, metadata.robo.name)
    luci = Riot.getData(metadata.luci, metadata.luci.name)

    players = %{
      tin: tin,
      brtt: brtt,
      cariok: cariok,
      robo: robo,
      luci: luci
    }

    render(conn, "index.json", players: players)
  end
end
