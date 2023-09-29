const patch = "13.14.1";
const apioops = ""

const queryGET = (resource) => {
  return fetch(resource)
    .then((response) => response.json(), response => console.log(response));
};


const searchSummonerName = (summonerName) => {
  
  //const url = `https://eb575aj2ve.execute-api.us-west-2.amazonaws.com/test/searchsummoner=${summonerName}`
  const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apioops}`
  return queryGET(url)
  return queryGET(
    `https://wx4vohcvy0.execute-api.us-west-1.amazonaws.com/beta/summoner/na1/${summonerName}`
  );
};

const searchPuuid = (puuid) => {
  const url = `/riot-api/lol/summoner/v4/summoners/by-puuid/${puuid}`
  // const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apioops}`
  return queryGET(url)
}
let totalGames = 5
const getMatchList = (puuid) => {
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${totalGames}&api_key=${apioops}`
  // const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${totalGames}&api_key=${apioops}`
  return queryGET(url);
};

const getMatchDetails = (matchId) => {
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apioops}`
  return queryGET(url);
};

const getMatchTimeline = (matchId) => {
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${apioops}`
  // const url = `https://na1.api.riotgames.com/lol/match/v5/timelines/by-match/${matchId}?api_key=${apioops}`
  return queryGET(url);
};

const getPlayerRank = (id) => {
  const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apioops}`
  return queryGET(url);
};

const getProfilePic = (profileId) => {
  return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileId}.png`;
  //return `/dragontail-10.11/10.11.1/img/profileicon/${profileId}.png`
  //return `https://cdn.communitydragon.org/${patch}/profile-icon/${profileId}`
};

const getChampionPic = (champName) => {
  if (champName === undefined) {
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEWAgIB7e3vCwsLIyMjPz8/V1dV4eHjc3Nzj4+PMzMzt7e1zc3O/v7/////39/fx8fHg4ODJbms7AAABaElEQVR4nO3dSWrDABBFQcm2PMkZ7n/aaJFNiCEmZOBJVSf4b9/Qw9Pzy/V8Pp8W0+Lw7rL/YPd9+y9dDo+YHnH65DpM8/Ge8S/dXfAz5tswHYc1G3cK65bCg8I2hX0K+xT2KexT2LcUXsb/HvGrlsK9wjaFfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9h3yYKdwrbFPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+xT2KexT2LeJiyGFcQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+xT2baJw/T9K1v9nRmGcwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8K+pXBS2KawT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insG8ThSeFbQr7FPYp7FPYp7BPYZ/Cvm0UzuOazbfhetut2e31DZx9EnazzT4gAAAAAElFTkSuQmCC`;
  } else {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champName}.png`;
  }
};

const getItemPic = (itemId) => {
  if (itemId === 0) {
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEWAgIB7e3vCwsLIyMjPz8/V1dV4eHjc3Nzj4+PMzMzt7e1zc3O/v7/////39/fx8fHg4ODJbms7AAABaElEQVR4nO3dSWrDABBFQcm2PMkZ7n/aaJFNiCEmZOBJVSf4b9/Qw9Pzy/V8Pp8W0+Lw7rL/YPd9+y9dDo+YHnH65DpM8/Ge8S/dXfAz5tswHYc1G3cK65bCg8I2hX0K+xT2KexT2LcUXsb/HvGrlsK9wjaFfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9h3yYKdwrbFPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+xT2KexT2LeJiyGFcQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+xT2baJw/T9K1v9nRmGcwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8K+pXBS2KawT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insG8ThSeFbQr7FPYp7FPYp7BPYZ/Cvm0UzuOazbfhetut2e31DZx9EnazzT4gAAAAAElFTkSuQmCC`;
  } else {
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${itemId}.png`;
  }
};

const getRankPic = (rankTier) => {
  if (rankTier === "0") {
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/unranked-emblem.png`
  }
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests${rankTier}`;
};

const getSummonerSpellPic = (spellId) => {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${spellId}`;
};

const getRuneJson = () => {
  return queryGET(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`
  );
};

const getChampionJson = () => {
  return queryGET(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/championFull.json`
  );
};

const getItemJson = () => {
  return queryGET(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`
  );
};

const getSummonerJson = () => {
  return queryGET(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/summoner.json`
  );
};

const getDamageJson = () => {
  return queryGET(`/testJson/damageKey.json`);
};

const getSpellDamageJson = () => {
  return queryGET("/testJson/spellDamageKey.json");
};

const getArmorJson = () => {
  return queryGET("/testJson/armorKey.json");
};

const getSpellBlockJson = () => {
  return queryGET("/testJson/spellBlockKey.json");
};

const getRuneImage = (secondHalfOfPath) => {
  return `https://ddragon.leagueoflegends.com/cdn/img/${secondHalfOfPath}`;
};

const getMapImage = (mapId) => {
  return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/map/map${mapId}.png`;
};

const getTimelineImage = (asset) => {
  return `${asset}`;
};

const getScoreboardImage = (asset) => {
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/${asset}.png`;
};

export {
  searchSummonerName,
  searchPuuid,
  getMatchList,
  getMatchTimeline,
  getPlayerRank,
  getProfilePic,
  getChampionJson,
  getSummonerJson,
  getScoreboardImage,
  getChampionPic,
  getMatchDetails,
  getItemPic,
  getRankPic,
  getSummonerSpellPic,
  getRuneJson,
  getRuneImage,
  getMapImage,
  getItemJson,
  getTimelineImage,
  getDamageJson,
  getSpellBlockJson,
  getArmorJson,
  getSpellDamageJson,
};
