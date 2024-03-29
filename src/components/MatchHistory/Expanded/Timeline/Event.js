import React from "react";
import { getChampionPic, getTimelineImage } from "../../../../RiotAPI";

const Event = (props) => {

  let time = props.timestamp / 1000;
  if (time % 60 !== 0) {
    let seconds = "" + Math.floor(time % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    time = time / 60;
    time = Math.floor(time);
    time = time + ":" + seconds;
  } else {
    time = time / 60;
  }

  /** 
  function convertSnakeCaseToCapitalizedString(snakeCaseText) {
    // Replace underscores with spaces
    let spacedText = snakeCaseText.replace(/_/g, ' ');
  
    // Convert to lowercase
    let lowercaseText = spacedText.toLowerCase();
  
    // Capitalize the first letter of each word
    let words = lowercaseText.split(' ');
    let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
    // Join the words with spaces
    let result = capitalizedWords.join(' ');
  
    return result;
  }
  */
  function getWardTypePath(wardType) {
    switch (wardType) {
      case "SIGHT_WARD": 
        return "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3340_class_t1_wardingtotem.png"
      case "CONTROL_WARD": 
        return "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/2055_class_t1_controlward.png"
      case "YELLOW_TRINKET":
        return "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3340_class_t1_wardingtotem.png"
      case "BLUE_TRINKET": 
        return "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3363_class_t1_farsightalteration.png"
      default:
        return ""
    }
  }

  function handleSpecialKill(eventType) {
    switch (eventType.killType) {
      case "KILL_FIRST_BLOOD":
        return (
          <div>
            Time: {time}{" "}
            <img
              height="20px"
              width="20px"
              style={{ display: "inLineFlex" }}
              alt="loading"
              src={getChampionPic(props.playerBios[eventType.killerId - 1][3])}
            ></img>{" "}
            {props.playerBios[eventType.killerId - 1][0]} got First blood
          </div>
        )
      case "KILL_ACE":
        return (
          <div>
              Time: {time}{" "}
              ACE!!!
          </div>
        )
      case "KILL_MULTI":

        return (
          <div>
            Time: {time}{" "}
            <img
              height="20px"
              width="20px"
              style={{ display: "inLineFlex" }}
              alt="loading"
              src={getChampionPic(props.playerBios[eventType.killerId - 1][3])}
            ></img>{" "}
            {props.playerBios[eventType.killerId - 1][0]} got a {convertNumberToWord(eventType.multiKillLength)} kill!
          </div>
        )
      
    }
  }

  function convertNumberToWord(number) {
    if (number === 2) {
      return 'Double';
    } else if (number === 3) {
      return 'Triple';
    } else if (number === 4) {
      return 'Quadra';
    } else if (number === 5) {
      return 'Penta';
    } else {
      return 'Unsupported number';
    }
  }

  function killDragon() {
    let teamId = props.playerBios[props.killerId-1][2]
    switch(props.monsterSubType) {
      case "FIRE_DRAGON":
        return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/fire-${teamId}.png`
      case "WATER_DRAGON":
        return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/water-${teamId}.png`
      case "AIR_DRAGON":
        return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/air-${teamId}.png`
      case "EARTH_DRAGON":
        return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/earth-${teamId}.png`
      case "ELDER_DRAGON":
        return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/elder-${teamId}.png`
      default:
        return ""
    }
  }

  function destroyTower() {
    let test = 100
    if (props.teamId === 100) {
      return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-${test}.png`
    }
    return "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-200.png"
  }

  const handleEvent = () => {
    switch (props.type) {
      case "CHAMPION_KILL":
        if (props.killerId !== 0) {
          if (props.victimId === 0) {
            //console.log("GOT HERE AT RIGHT TIME")
            return <div></div>
          } else {
            return (
              <div className="champKill">
                Time: {time}{" "}
                <img
                  height="20px"
                  width="20px"
                  style={{ display: "inLineFlex" }}
                  alt="loading"
                  src={getChampionPic(props.playerBios[props.killerId - 1][3])}
                ></img>{" "}
                {props.playerBios[props.killerId - 1][0]} killed{" "}
                <img
                  height="20px"
                  width="20px"
                  style={{ display: "inLineFlex" }}
                  alt="loading"
                  src={getChampionPic(props.playerBios[props.victimId - 1][3])}
                ></img>{" "}
                {props.playerBios[props.victimId - 1][0]}
              </div>
            );
          }
          
        } else {
          return (
            <div>
              Time: {time}{" "}
              <img
                height="20px"
                width="20px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getChampionPic(props.playerBios[props.victimId - 1][3])}
              ></img>{" "}
              {props.playerBios[props.victimId - 1][0]} got executed
            </div>
          );
        }

      case "WARD_PLACED":
        if (props.wardType === "TEEMO_MUSHROOM" || props.wardType === "UNDEFINED") {
          return(
            <div></div>
          )
        } else {
            return(
              <div className="wardPlace">
                  Time: {time}{" "}
                  <img
                    height="20px"
                    width="20px"
                    style={{ display: "inLineFlex" }}
                    alt="loading"
                    src={getChampionPic(props.playerBios[props.creatorId - 1][3])}
                  ></img>{" "}
                  {props.playerBios[props.creatorId - 1][0]} placed a{" "}
                  <img
                    height="20px"
                    width="20px"
                    style={{ display: "inLineFlex" }}
                    alt="loading"
                    src={getTimelineImage(getWardTypePath(props.wardType))}
                  ></img>
                </div>
              )
        }

      case "WARD_KILL":
        if (props.wardType === "TEEMO_MUSHROOM" || props.wardType === "undefined") {
          return <div></div>
        } else {
          return (
            <div>
              Time: {time}{" "}
              <img
                height="20px"
                width="20px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getChampionPic(props.playerBios[props.killerId - 1][3])}
              ></img>{" "}
              {props.playerBios[props.killerId - 1][0]} killed a{" "}
              <img
                height="20px"
                width="20px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getTimelineImage(getWardTypePath(props.wardType))}
              ></img>
            </div>
          );
        }
        
      case "BUILDING_KILL":
        if (props.killerId === 0) {
          if (props.buildingType === "INHIBITOR_BUILDING") {
            return (
              <div className="buildingKill">
                Time: {time} A minion destroyed an{" "}
                <img
                  height="20px"
                  width="15px"
                  style={{ display: "inLineFlex" }}
                  alt="loading"
                  src={getTimelineImage(destroyTower())}
                ></img>{" "}
                Inhibitor
              </div>
            );
          } else {
            return (
              <div className="buildingKill">
                Time: {time} A minion destroyed a{" "}
                <img
                  height="20px"
                  width="15px"
                  style={{ display: "inLineFlex" }}
                  alt="loading"
                  src={getTimelineImage(destroyTower())}
                ></img>{" "}
                Tower
              </div>
            );
          }
        } else if (props.buildingType === "INHIBITOR_BUILDING") {
          return (
            <div className="buildingKill">
              Time: {time}{" "}
              <img
                height="20px"
                width="20px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getChampionPic(props.playerBios[props.killerId - 1][3])}
              ></img>{" "}
              {props.playerBios[props.killerId - 1][0]} destroyed an{" "}
              <img
                height="20px"
                width="15px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getTimelineImage(destroyTower())}
              ></img>{" "}
              Inhibitor
            </div>
          );
        } else {
          return (
            <div className="buildingKill">
              Time: {time}{" "}
              <img
                height="20px"
                width="20px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getChampionPic(props.playerBios[props.killerId - 1][3])}
              ></img>{" "}
              {props.playerBios[props.killerId - 1][0]} destroyed a{" "}
              <img
                height="20px"
                width="15px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getTimelineImage(destroyTower())}
              ></img>{" "}
              Tower
            </div>
          );
        }

      case "ELITE_MONSTER_KILL":
        //<img height="20px"width="20px"style={{display:"inLineFlex"}}alt="loading"src={getChampionPic(props.playerBios[props.participantId-1][1])}></img>
        if (props.killerId === 0) {
          return <div></div>;
        } else if (props.monsterType === "DRAGON") {
          return (
            <div className="eliteMonsterKill">
              Time: {time}{" "}
              <img
                height="20px"
                width="20px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getChampionPic(props.playerBios[props.killerId - 1][3])}
              ></img>{" "}
              {props.playerBios[props.killerId - 1][0]} killed{" "}
              <img
                height="20px"
                width="15px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getTimelineImage(killDragon(props.monsterSubType))}
              ></img>
            </div>
          );
        } else {
          return (
            <div className="eliteMonsterKill">
              Time: {time}{" "}
              <img
                height="20px"
                width="20px"
                style={{ display: "inLineFlex" }}
                alt="loading"
                src={getChampionPic(props.playerBios[props.killerId - 1][3])}
              ></img>{" "}
              {props.playerBios[props.killerId - 1][0]} killed{" "}
              {props.monsterType}
            </div>
          );
        }

      case "ITEM_PURCHASED":
        return null;
      case "ITEM_DESTROYED":
        return null;
      case "ITEM_SOLD":
        return null;
      case "ITEM_UNDO":
        return null;
      case "SKILL_LEVEL_UP":
        return null;
      case "ASCENDED_EVENT":
        return <div>Time: {time} Ascension?</div>;
      case "CAPTURE_POINT":
        return null;
      case "PORO_KING_SUMMON":
        return null;
      case "TURRET_PLATE_DESTROYED":
        return null;
      case "PAUSE_END":
        return null;
      case "GAME_END":
        return null;
      case "LEVEL_UP":
        return
        return (
          <div>
            Time: {time}{" "}
            <img
              height="20px"
              width="20px"
              style={{ display: "inLineFlex" }}
              alt="loading"
              src={getChampionPic(props.playerBios[props.participantId - 1][3])}
            ></img>{" "}
            {props.playerBios[props.participantId - 1][0]} Leveled Up!
          </div>
        );
      case "CHAMPION_SPECIAL_KILL":
        return handleSpecialKill(props)
      default:
        return <div>{props.type}</div>;
    }
  };
  let eventResponse = handleEvent();
  return <div>{eventResponse}</div>;
};

export default Event;

/*


src = {getChampionPic(props.playerBios[props.killerId - 1][1])}


*/
