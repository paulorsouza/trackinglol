defmodule TrackingthegodsWeb.PlayerView do
  use TrackingthegodsWeb, :view

  def render("index.json", %{players: nil}), do: render("index.json", players: [])

  # def render("index.json", %{players: players}) do
  #   %{
  #     data: render_many(players, TrackingthegodsWeb.PlayerView, "players.json")
  #   }
  # end

  def render("index.json", %{players: players}) do
    render_one(players, TrackingthegodsWeb.PlayerView, "players.json")
  end

  def render("players.json", %{player: player}) do
    %{
      tin: player.tin,
      brtt: player.brtt,
      cariok: player.cariok,
      robo: player.robo,
      luci: player.luci
    }
  end
end
