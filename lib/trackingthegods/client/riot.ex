defmodule Trackingthegods.Client.Riot do
  alias Trackingthegods.Champions

  @metadata %{
    tin: %{
      id: "JGx_KiwAAwgken9SKAkLfx-S3SDohE7h-SrorKHRldgh6HCKjq56rzZCkg",
      accountId: "FOW4n6xXkLYFxFEHTbdWNbiTo8rQs_5qIfpbKhSwJ0OevCCNGfJRzspj",
      name: "MSI KDA PLAYER",
      puuid: "I80Pg1AMbkN62vBlBTYMDIhXoYoS8CwcxDozu0XIxqvxPbZPr9VtusynGBbXuI4bUmSehJT0bIf5-Q",
    },
    brtt: %{
      id: "IyjNtgo7bmXfWofywfKWEK1knH3UklysuQwugkgx2RZy7LDMUqNtWguwng",
      accountId: "WnLBylZZZDuiLgDnMgPWIYV7wNlTDYk1TQdfWls00x2KDEvPZdzzFxzr",
      puuid: "9LuolxF4wfcmaSm7TWyouqgBxePWus1fex034YodoV680gv7n7jNYzCfUkAC5nUIhrEATGrcGe8rdQ",
      name: "40 years trapper"
    },
    cariok: %{
      id: "EdSP_PuPBC0IMRxuDOjRZ6PmsJBYL1X0w2Y7LKjHxuTHSW6iDgWX_VuM_Q",
      accountId: "x5MQgIY9kIi38HZps-hcBqi_02gZUxj_3Ql1IwS2HRmcLTJVcwxff-HW",
      puuid: "SG-HkjR-mhVQ1vw4qZ_5CdGPZyj_cjYYdB42rtcME39mmFc4qv5jRw_YNo8qc95NcOKHwbk4XNVMWQ",
      name: "cariokbcamp",
    },
    robo: %{
      id: "drLwqp-h8JFMfoilw_Uki1DeCxYPjeogZt0c64a2VvPt9GT7KRvkHsMtxw",
      accountId: "zAhQXot-fTtDa_WoVOEsCOxHQWD_IbzEu_N_iTFl_OPnY1wC9hHQPZkG",
      puuid: "ED4bVeB6wlltgHnYF551obnY4sxdxKAIpJ5WMFkPWyg-uEeMLtWI8fAFdF1vuJZQoq0RIOOSa2GwnA",
      name: "É O ROBS",
    },
    luci: %{
      id: "IsdYyPJEjaHdT2wF8YY3oxELiyZkmsKRbUluR7Ahk0Goq4bJ-ebGK1deYA",
      accountId: "qnRdGZW6tTVz9XWGVYST2vubsoaiCKnfzFwQ-aUNtMzJ7YU1IcHdasKt",
      puuid: "5yBTGLGpCJF2yw-8TP0aySeJrz_GmqGqydWkK-L3RcNX9E7vAhF6-iV_XTMqoUFwNLQMJyzrrl5I6g",
      name: "DK TroubleMaker",
    },
    test: %{
      id: ""
    },
    apiId: "RGAPI-8e20e45d-3e3a-4f0e-a5d7-503007a67f78"
    # apiId: "RGAPI-1c7c5dc7-e491-4767-af44-6687e16c8930"
  }

  @dataURL "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
  @specURL "https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"
  @getIdURL "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"

  def getMetaData, do: @metadata

  def getIdByName(name) do
    case HTTPoison.get("#{@getIdURL}#{name}?api_key=#{@metadata.apiId}") do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        IO.inspect Jason.decode!(body)
      error -> {:error, error}
    end
  end

  def getData(player, name) do
    case HTTPoison.get("#{@dataURL}#{player.id}?api_key=#{@metadata.apiId}") do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        data = Enum.map(Jason.decode!(body), fn d ->
          %{
            name: name,
            rank: d["tier"] <> " " <> d["rank"],
            wins: d["wins"],
            losses: d["losses"],
            lp: d["leaguePoints"]
          }
        end)
        List.first(data)

      error -> {:error, error}
    end
  end

  def getSpec(player) do
    case HTTPoison.get("#{@specURL}#{player.id}?api_key=#{@metadata.apiId}") do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, Jason.decode!(body)}
      error -> {:error, error}
    end
  end

  def parseSpec(spec) do
    %{
      bans: getBans(spec),
      participants: getParticipants(spec),
      gameId: spec["gameId"],
      gameLength: spec["gameLength"],
      specKey: spec["observers"]["encryptionKey"]
    }
  end

  def updateSpec(spec, gameLength) do
    Map.update!(spec, :gameLength, gameLength)
  end

  def getBans(specData) do
    bans = specData["bannedChampions"]
    Enum.map(bans, fn b ->
      team = if(b["teamId"] == 100) do "Blue" else "Red" end
      %{
        champ: Champions.get(b["championId"]),
        team: team
      }
    end)
  end

  def getParticipants(specData) do
    participants = specData["participants"]

    Enum.map(participants, fn p ->
      team = if(p["teamId"] == 100) do "Blue" else "Red" end
      %{
        champ: Champions.get(p["championId"]),
        team: team,
        summonerName: p["summonerName"],
        summonerId: p["summonerId"]
      }
    end)
  end

end
