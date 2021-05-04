# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
use Mix.Config

database_url =
  System.get_env("DATABASE_URL") ||
    raise """
    environment variable DATABASE_URL is missing.
    For example: ecto://USER:PASS@HOST/DATABASE
    """

config :trackingthegods, Trackingthegods.Repo,
  url: database_url,
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  ssl: true

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :trackingthegods, TrackingthegodsWeb.Endpoint,
  http: [port: String.to_integer(System.get_env("PORT") || "4000")],
  url: [scheme: "https", host: System.get_env("URL_HOST"), port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  secret_key_base: secret_key_base

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
#     config :trackingthegods, TrackingthegodsWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
