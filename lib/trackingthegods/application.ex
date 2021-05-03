defmodule Trackingthegods.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Trackingthegods.Repo,
      # Start the Telemetry supervisor
      TrackingthegodsWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Trackingthegods.PubSub},
      # Start the Endpoint (http/https)
      TrackingthegodsWeb.Endpoint,
      # Start a worker by calling: Trackingthegods.Worker.start_link(arg)
      # {Trackingthegods.Worker, arg}
      Trackingthegods.Jobs.Rank,
      Trackingthegods.Jobs.Spec
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Trackingthegods.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    TrackingthegodsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
