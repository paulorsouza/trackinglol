defmodule TrackingthegodsWeb.PainPlayersChannel do
  use TrackingthegodsWeb, :channel

  intercept ["update_rank", "update_spec"]

  def join("pain:players", _payload, socket) do
    {:ok, socket}
  end

  def handle_out(event, payload, socket = %{topic: "pain:players"}) do
    push(socket, event, payload)
    {:noreply, socket}
  end

  def broadcast_rank(state) do
    TrackingthegodsWeb.Endpoint.broadcast("pain:players", "update_rank", state)
  end

  def broadcast_spec(state) do
    TrackingthegodsWeb.Endpoint.broadcast("pain:players", "update_spec", state)
  end
end
