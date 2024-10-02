import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException

load_dotenv()

RIOT_API_TOKEN = os.getenv("RIOT_API_TOKEN")
if not RIOT_API_TOKEN:
    raise ValueError("Riot Games API token is missing in environment variables")

app = FastAPI()

# func for getting puuid from riot
def get_puuid(gameName: str, tagLine: str):
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}?api_key={RIOT_API_TOKEN}"

    response = requests.get(url)

    if response.status_code != 200:
        print(f"Error fetching player info: {response.content}")
        raise HTTPException(status_code=response.status_code, detail="Error fetching player info")

    player_info = response.json()
    return player_info['puuid']

@app.get("/player-info")
def player_info(gameName: str, tagLine: str):
    puuid = get_puuid(gameName, tagLine)
    return {"puuid": puuid}

# func that takes puuid and returns id + other values
@app.get("/summoner-info")
def summoner_info(puuid: str):
    url = f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}?api_key={RIOT_API_TOKEN}"

    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error fetching summoner info: {response.content}")
        raise HTTPException(status_code=response.status_code, detail="Error fetching summoner info")

    summoner_info = response.json()
    return {
        "id": summoner_info["id"],
        "accountId": summoner_info["accountId"],
        "profileIconId": summoner_info["profileIconId"],
        "summonerLevel": summoner_info["summonerLevel"]
    }


# gets list of the last 20 matches from puuid
@app.get("/summoner-matches")
def summoner_matches(puuid: str):
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20&api_key={RIOT_API_TOKEN}"

    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error fetching summoner info: {response.content}")
        raise HTTPException(status_code=response.status_code, detail="Error fetching summoner info")

    matches = response.json()
    return {"matches": matches}

# gets stats of each individual match
@app.get("/summoner-match-stats")
def summoner_match_stats(matchId: str):
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/{matchId}?api_key={RIOT_API_TOKEN}"

    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error fetching summmoner info: {response.content}")
        raise HTTPException(status_code=response.status_code, detail="Error fetching summoner info")

    match_stats = response.json()
    return {"match_stats": match_stats}


# func to get
def get_match_data(region, matchId):
    url = f"https://{region}.api.riotgames.com/lol/match/v5/matches/{matchId}?api_key={RIOT_API_TOKEN}"

    response = requests.get(url)
    match_stats = response.json()
    return match_stats

# func that goes through a match's data seeing if the participant (puuid) won
def did_win(puuid, match_data):
    part_index = match_data['metadata']['participants'].index(puuid)
    return match_data['info']['participants'][part_index]['win']

