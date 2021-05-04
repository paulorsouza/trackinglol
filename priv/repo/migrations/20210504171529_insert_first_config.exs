defmodule Trackingthegods.Repo.Migrations.InsertFirstConfig do
  use Ecto.Migration

  def up do
    execute "insert INTO riot_config(key, key2, key3, version, inserted_at, updated_at) values ('', '', '', 1, current_timestamp, current_timestamp)"
  end
end
