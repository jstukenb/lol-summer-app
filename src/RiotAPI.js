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
  return fetch(`${urlFor(resource)}`, {
    method: "GET",
    headers: requestHeaders
  })
    .then(okCheck, emitNativeError)
    .then(response => response.json())
}

const searchSummonerName = summonerName => {
  const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`
  return riotQueryGET(url)
}

const getMatchList = (accountId) => {
  const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&beginIndex=0&`
  return riotQueryGET(url)
}

const getMatchDetails = gameId => {
  const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}`
  return riotQueryGET(url)
}

const getChampionMastery = (summonerId, championId) => {
  const url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}?api_key=${apiKey}`
  return queryGET(url)
}

const getPlayerRank = (summonerId) => {
  const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
  return queryGET(url)
}

const getProfilePic = profileId => {
  return `/dragontail-10.11/10.11.1/img/profileicon/${profileId}.png`
  //return `https://cdn.communitydragon.org/${patch}/profile-icon/${profileId}`
}

const getChampionPic = championId => {
  return `https://cdn.communitydragon.org/${patch}/champion/${championId}/square`
}

const getItemPic = itemId => {
  return `/dragontail-10.11/10.11.1/img/item/${itemId}.png`
}

const getRankPic = rankTier => {
  return `/dragontail-10.11/10.11.1/img/rank/${rankTier}.png`
}

const getSummonerSpellPic = spellId => {
  return `/dragontail-10.11/10.11.1/img/summonerspells/${spellId}.png`
}

const cacheTest = (summonerName) => {
  return `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
  
}

export { searchSummonerName, getMatchList, getChampionMastery, getPlayerRank, getProfilePic, getChampionPic, getMatchDetails, getItemPic, getRankPic, getSummonerSpellPic, cacheTest }