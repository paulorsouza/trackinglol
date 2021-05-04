defmodule Trackingthegods.Repo.Migrations.CreateAppConfig do
  use Ecto.Migration

  def change do
    create table(:riot_config) do
      add :key, :string
      add :key2, :string
      add :key3, :string
      add :version, :integer

      timestamps()
    end
  end
end
