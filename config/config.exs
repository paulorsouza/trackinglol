# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :trackingthegods,
  ecto_repos: [Trackingthegods.Repo]

# Configures the endpoint
config :trackingthegods, TrackingthegodsWeb.Endpoint,
  http: [port: System.get_env("PORT") || 4000],
  url: [scheme: "https", host: System.get_env("URL_HOST"), port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  secret_key_base: "+STatWzIVjiF311BT6SnsaR5nyoO4oPKOqFL6/QCt7KlYAb3LGu3uZLL87i/iGIn",
  render_errors: [view: TrackingthegodsWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Trackingthegods.PubSub,
  live_view: [signing_salt: "CeR1aTDV"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
