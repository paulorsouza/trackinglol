defmodule TrackingthegodsWeb.SpecView do
  use TrackingthegodsWeb, :view

  def render("index.json", %{specs: nil}), do: render("index.json", specs: [])

  def render("index.json", %{specs: specs}) do
    render_one(specs, TrackingthegodsWeb.SpecView, "specs.json")
  end

  def render("specs.json", %{spec: spec}) do
    %{
      tin: spec.tin,
      brtt: spec.brtt,
      cariok: spec.cariok,
      robo: spec.robo,
      luci: spec.luci
    }
  end
end
