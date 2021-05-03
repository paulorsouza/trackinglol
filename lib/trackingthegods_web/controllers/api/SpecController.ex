defmodule TrackingthegodsWeb.SpecController do
  use TrackingthegodsWeb, :controller

  def index(conn, _params) do
    specs = GenServer.call(Trackingthegods.Jobs.Spec, :get)

    render(conn, "index.json", specs: specs)
  end
end
