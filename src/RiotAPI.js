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

const requestHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json"
}

const queryGET = resource => {
  return fetch(resource).then(response => response.json())
}

const searchSummonerName = summonerName => {
  //const url = `https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/beta/summoner/na1/${summonerName}`
  //const url = `https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/rgapi/summoner/na1/${id}`
  //return queryGET(url)
  return queryGET(`https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/beta/summoner/na1/${summonerName}`)
}

const getMatchList = (accountId) => {
  const url = `https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/beta/matchhistory/na1/${accountId}`
  //const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=5&beginIndex=0`
  return queryGET(url)
}

const getMatchDetails = matchId => {
  const url = `https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/beta/matchdetails/na1/${matchId}`
  //const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}`
  return queryGET(url)
}

const getMatchTimeline = matchId => {
  const url = `https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/beta/matchtimeline/na1/${matchId}`
  //const url = `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}`
  return queryGET(url)
}

const getPlayerRank = (id) => {
  const url = `https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/beta/rank/na1/${id}`
  //const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`
  return queryGET(url)
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

const getScoreboardImage = (asset) => {
  return `/dragontail-10.11/10.11.1/img/scoreboard/${asset}.png`
}

export { 
          searchSummonerName, getMatchList, getMatchTimeline, getPlayerRank, getProfilePic, getChampionJson, getSummonerJson, getScoreboardImage,
          getChampionPic, getMatchDetails, getItemPic, getRankPic, getSummonerSpellPic, getRuneJson, getRuneImage, getMapImage, getItemJson, getTimelineImage,
        }