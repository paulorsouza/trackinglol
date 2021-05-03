defmodule Trackingthegods.Repo do
  use Ecto.Repo,
    otp_app: :trackingthegods,
    adapter: Ecto.Adapters.Postgres
end
