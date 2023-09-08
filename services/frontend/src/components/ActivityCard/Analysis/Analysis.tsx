import React, { useState, useEffect } from "react";
import "chart.js";
import { LineChart } from "react-chartkick";

const Analysis  = () => {
  const [userOutcomes, setUserOutcomes] = useState<string[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [userEvents, setUserEvents] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [userSpecificEvents, setUserSpecificEvents] = useState<string[]>([]);
  const [selectedSpecificEvent, setSelectedSpecificEvent] = useState<string>("");
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [chartTitle, setChartTitle] = useState<string>("");
  const [yTitle, setYTitle] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "selectedOutcome") {
      setSelectedOutcome(value);
    } else if (name === "selectedEvent") {
      setSelectedEvent(value);
    } else if (name === "selectedSpecificEvent") {
      setSelectedSpecificEvent(value);
    }
  };

  const getUserOptions = () => {
    // axios
    //   .get(`/api/analysis/user/${user._id}/options`)
    //   .then((res) => {
    //     setUserOutcomes([...res.data.userOutcomes]);
    //     setUserEvents([...res.data.userEvents]);

    //     if (selectedEvent && selectedEvent !== "Sleep") {
    //       setUserSpecificEvents([...res.data[selectedEvent]]);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const getSelectedData = () => {
    // axios
    //   .get(
    //     `/api/analysis/user/${user._id}/selected-data/${selectedOutcome}/${selectedEvent}/${
    //       selectedEvent === "Sleep" ? "Sleep" : selectedSpecificEvent
    //     }`
    //   )
    //   .then((res) => {
    //     if (typeof res.data !== "string") {
    //       setSelectedData([...res.data]);
    //     } else {
    //       setSelectedData([]);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   getUserOptions();
  // }, [user._id, selectedEvent]);

  // useEffect(() => {
  //   getSelectedData();
  // }, [user._id, selectedOutcome, selectedEvent, selectedSpecificEvent]);

  useEffect(() => {
    let newChartTitle = "";
    let newYTitle = "";

    if (selectedOutcome === "Energy") {
      newChartTitle = "Energy Level & ";
      newYTitle = "Energy Level";
    } else {
      newChartTitle = selectedOutcome + " & ";
      newYTitle = "Symptom Intensity";
    }

    newChartTitle += selectedSpecificEvent;
    let specificEventType = "";

    switch (selectedEvent) {
      case "Foods":
        specificEventType = "food";
        newYTitle += " / Food Portions";
        break;

      case "Drinks":
        specificEventType = "drink";
        newYTitle += " / Drink Portions";
        break;

      case "Exercise":
        specificEventType = "exercise";
        newYTitle += " / Duration";
        break;

      default:
        newChartTitle = newChartTitle.split("&")[0] + "& Sleep";
        newYTitle += " / Duration";
    }

    setChartTitle(newChartTitle);
    setYTitle(newYTitle);
  }, [selectedOutcome, selectedEvent, selectedSpecificEvent]);

  return (
    <div>
      <div className="flex flex-column items-center pt3 pb5">
        <div className="flex items-center">
          <label className="f6 w3 dib gray" htmlFor="selectedOutcome">
            Outcome:
          </label>
          <select
            className="f6 pa1 mr3 ml1 w4 mv1"
            name="selectedOutcome"
            id="selectedOutcome"
            onChange={handleChange}
            value={selectedOutcome}
          >
            {userOutcomes.map((option) => (
              <option key={option} value={option} className="f6">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="f6 w3 dib gray" htmlFor="selectedEvent">
            Event:
          </label>
          <select
            className="f6 pa1 mr3 ml1 w4 mv1"
            name="selectedEvent"
            id="selectedEvent"
            onChange={handleChange}
            value={selectedEvent}
          >
            {userEvents.map((option) => (
              <option key={option} value={option} className="f6">
                {option}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent === "Sleep" ||
        selectedEvent === "Select" ||
        !selectedEvent ? (
          <></>
        ) : (
          <div className="flex items-center">
            <label className="f6 w3 dib gray" htmlFor="selectedSpecificEvent">
              Select {selectedSpecificEvent}:
            </label>
            <select
              className="f6 pa1 mr3 ml1 w4 mv1"
              name="selectedSpecificEvent"
              id="selectedSpecificEvent"
              onChange={handleChange}
              value={selectedSpecificEvent}
            >
              {userSpecificEvents.map((option) => (
                <option key={option} value={option} className="f6">
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedData.length === 0 ||
        selectedOutcome === "Select" ||
        selectedEvent === "Select" ||
        selectedSpecificEvent === "Select" ? (
          <></>
        ) : (
          <div>
            <h3 className="pt1">{chartTitle}</h3>
            <LineChart
              data={selectedData}
              xtitle="Time"
              ytitle={yTitle}
              height="50vh"
              legend="bottom"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;
