let apiKey = process.env.REACT_APP_RIOT_API

const patch = "10.11.1"

const urlFor = resource => `${proxyUrl}${resource}`;

const HTTP_OK = 200;

var proxyUrl = ''//'https://cors-anywhere.herokuapp.com/'

const throwResponseError = response => {
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const emitNativeError = error => {
  throw error;
};

const statusCheck = successStatuses => response => {
  if (successStatuses.includes(response.status)) {
    return response;
  } else {
    throwResponseError(response);
  }
};

const okCheck = statusCheck([HTTP_OK]);

const riotRequestHeaders = {
  "Content-Type": "application/json;charset=utf-8",
  "X-Riot-Token": apiKey
};

const requestHeaders = {
  "Content-Type": "application/json;charset=utf-8"
}

const riotQueryGET = resource => {
  return fetch(`${urlFor(resource)}`, {
    method: "GET",
    headers: riotRequestHeaders,
  })
    .then(okCheck, emitNativeError)
    .then(response => response.json());
};

const queryGET = resource => {
  return fetch(resource, {
    method: "GET",
    headers: requestHeaders
  })
    .then(okCheck, emitNativeError)
    .then(response => response.json())
}

//'https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/rgapi/summoner/{region}/{id}'

const searchSummonerName = summonerName => {
  const url = `https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/rgapi/summoner/na1/${summonerName}`
  return queryGET(url)
}

const getMatchList = (accountId) => {
  const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=5&beginIndex=0&`
  return riotQueryGET(url)
}

const getMatchDetails = gameId => {
  const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}`
  return riotQueryGET(url)
}

const getMatchTimeline = gameId => {
  const url = `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${gameId}`
  return riotQueryGET(url)
}

const getChampionMastery = (summonerId, championId) => {
  const url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}?api_key=${apiKey}`
  return queryGET(url)
}

const getPlayerRank = (summonerId) => {
  const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
  return riotQueryGET(url)
}

const getProfilePic = profileId => {
  return `/dragontail-10.11/10.11.1/img/profileicon/${profileId}.png`
  //return `https://cdn.communitydragon.org/${patch}/profile-icon/${profileId}`
}

const getChampionPic = champName => {
  return `/dragontail-10.11/10.11.1/img/champion/${champName}.png`
}

const getItemPic = itemId => {
  return `/dragontail-10.11/10.11.1/img/item/${itemId}.png`
}

const getRankPic = rankTier => {
  return `/dragontail-10.11/10.11.1/img/ranked-emblems/Emblem_${rankTier}.png`
}

const getSummonerSpellPic = spellId => {
  return `/dragontail-10.11/10.11.1/img/summonerspells/${spellId}.png`
}

const getRuneJson = () => {
  return queryGET(`/dragontail-10.11/10.11.1/data/en_US/runesReforged.json`)
}

const getChampionJson = () => {
  return queryGET(`/dragontail-10.11/10.11.1/data/en_US/championFull.json`)
}

const getItemJson = () => {
  return queryGET(`/dragontail-10.11/10.11.1/data/en_US/item.json`)
}

const getSummonerJson = () => {
  return queryGET(`/dragontail-10.11/10.11.1/data/en_US/summoner.json`)
}

const getRuneImage = (secondHalfOfPath) => {
  return `/dragontail-10.11/img/${secondHalfOfPath}`
}

const getMapImage = (mapId) => {
  return `/dragontail-10.11/10.11.1/img/map/map${mapId}.png`
}

const getTimelineImage = (asset) => {
  return `/dragontail-10.11/10.11.1/img/timeline-assets/${asset}.png`
}

export { 
          searchSummonerName, getMatchList, getMatchTimeline, getChampionMastery, getPlayerRank, getProfilePic, getChampionJson, getSummonerJson,
          getChampionPic, getMatchDetails, getItemPic, getRankPic, getSummonerSpellPic, getRuneJson, getRuneImage, getMapImage, getItemJson, getTimelineImage,
        }