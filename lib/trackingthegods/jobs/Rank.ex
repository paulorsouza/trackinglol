defmodule Trackingthegods.Jobs.Rank do
  use GenServer

  alias Trackingthegods.Client.Riot

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{})
  end

  @impl true
  def init(_args) do
    schedule_call()
    state = getRank()
    {:ok, state}
  end

  @impl true
  def handle_info(:ping, state) do
    IO.inspect state
    schedule_call()
    rank = getRank()
    TrackingthegodsWeb.PainPlayersChannel.broadcast_rank(rank)
    {:noreply, rank}
  end

  def handle_info(:get, state) do
    {:reply, state}
  end

  defp schedule_call() do
    Process.send_after(self(), :ping, 300000)
  end

  defp getRank() do
    metadata = Riot.getMetaData()

    tin = Riot.getData(metadata.tin, metadata.tin.name)
    brtt = Riot.getData(metadata.brtt, metadata.brtt.name)
    cariok = Riot.getData(metadata.cariok, metadata.cariok.name)
    robo = Riot.getData(metadata.robo, metadata.robo.name)
    luci = Riot.getData(metadata.luci, metadata.luci.name)

    %{
      tin: tin,
      brtt: brtt,
      cariok: cariok,
      robo: robo,
      luci: luci
    }
  end
end
