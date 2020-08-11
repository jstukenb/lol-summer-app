import React from "react";
import { getChampionPic, getTimelineImage } from "../../../../RiotAPI";

const Event = (props) => {
  //console.log("EVENT PROPS: ", props)
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
                    src={getTimelineImage(props.wardType)}
                  ></img>
                </div>
              )
        }

      case "WARD_KILL":
        if (props.wardType === "TEEMO_MUSHROOM") {
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
                src={getTimelineImage(props.wardType)}
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
                  src={getTimelineImage(props.buildingType)}
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
                  src={getTimelineImage(props.buildingType)}
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
                src={getTimelineImage("TOWER_BUILDING")}
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
                src={getTimelineImage(props.buildingType)}
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
              {props.monsterSubType}
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
      default:
        return <div>UH OHHHH SOMETHIGN WENT WRONG</div>;
    }
  };
  let eventResponse = handleEvent();
  return <div>{eventResponse}</div>;
};

export default Event;

/*


src = {getChampionPic(props.playerBios[props.killerId - 1][1])}


*/
