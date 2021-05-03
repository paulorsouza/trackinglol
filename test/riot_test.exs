defmodule Trackingthegods.RiotClientTest do
  use Trackingthegods.DataCase

  alias Trackingthegods.Client.Riot

  test "get data" do
    metadata = Riot.getMetaData
    IO.inspect Riot.getData(metadata.tin, "MSI KDA PLAYER")
  end

  test "get id" do
    Riot.getIdByName("Big Bicep Bdon")
  end

  test "spec randon" do
    Riot.getSpec(%{id: "spOJkxKRcB0EQj-WiP3aUxJj2yuGFjfIoa_CRjcbS5_UeJFeXnYDJ8_1dQ"})
  end

end
