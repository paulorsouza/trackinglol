defmodule Trackingthegods.Jobs.RiotConfig do
  use GenServer

  alias Trackingthegods.Models.RiotConfig

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name:  __MODULE__)
  end

  @impl true
  def init(_args) do
    state = RiotConfig.get_config()
    {:ok, state}
  end

  @impl true
  def handle_call(:get, _from, state) do
    {:reply, state, state}
  end

  @impl true
  def handle_call(:update, _from, state) do
    new_state = RiotConfig.get_config()
    {:reply, new_state, new_state}
  end
end
