defmodule Trackingthegods.Jobs.Spec do
  use GenServer

  alias Trackingthegods.Client.Riot

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{})
  end

  @impl true
  def init(_args) do
    schedule_call()
    state = getSpec(%{
      tin: nil,
      brtt: nil,
      cariok: nil,
      robo: nil,
      luci: nil
    })
    {:ok, state}
  end

  @impl true
  def handle_info(:ping, state) do
    schedule_call()
    TrackingthegodsWeb.PainPlayersChannel.broadcast_spec(state)

    {:noreply, getSpec(state)}
  end

  defp schedule_call() do
    Process.send_after(self(), :ping, 30000)
  end

  defp getSpec(state) do
    metadata = Riot.getMetaData()

    tin = createOrUpdate(metadata.tin, state.tin)
    brtt = createOrUpdate(metadata.brtt, state.brtt)
    cariok = createOrUpdate(metadata.cariok, state.cariok)
    robo = createOrUpdate(metadata.robo, state.robo)
    luci = createOrUpdate(metadata.luci, state.luci)

    %{
      tin: tin,
      brtt: brtt,
      cariok: cariok,
      robo: robo,
      luci: luci
    }
  end

  defp createOrUpdate(player, actualState) do
    spec = Riot.getSpec(player)
    case spec do
      {:error, _e} -> nil
      {:ok, spec} ->
        if(is_nil(actualState)) do
          Riot.parseSpec(spec)
        else
          Riot.updateSpec(actualState, spec["gameLength"])
        end
    end
  end

end
