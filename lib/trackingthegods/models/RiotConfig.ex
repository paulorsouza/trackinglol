defmodule Trackingthegods.Models.RiotConfig do
  use Ecto.Schema
  import Ecto.Changeset

  alias Trackingthegods.Repo
  alias Trackingthegods.Models.RiotConfig

  schema "riot_config" do
    field :key, :string
    field :key2, :string
    field :key3, :string
    field :version, :integer
  end

  def changeset(model, params \\ :empty) do
    model |> cast(params, [:key, :key2, :key3, :version])
  end

  def get_config() do
    Repo.get_by!(RiotConfig, version: 1)
  end
end
