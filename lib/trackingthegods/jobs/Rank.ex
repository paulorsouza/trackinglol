defmodule Trackingthegods.Jobs.Rank do
  use GenServer

  alias Trackingthegods.Client.Riot

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name:  __MODULE__)
  end

  @impl true
  def init(_args) do
    schedule_call()
    state = getRank()
    {:ok, state}
  end

  @impl true
  def handle_info(:ping, state) do
    schedule_call()
    rank = getRank()
    TrackingthegodsWeb.PainPlayersChannel.broadcast_rank(rank)
    {:noreply, rank}
  end

  @impl true
  def handle_call(:get, _from, state) do
    {:reply, state, state}
  end

  defp schedule_call() do
    Process.send_after(self(), :ping, 30000000)
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
