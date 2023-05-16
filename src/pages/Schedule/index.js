import { useState, useEffect } from "react";

const Schedule = () => {
  const [schedule, setSchedule] = useState({});
  const [day, setDay] = useState("mon");

  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await fetch("http://localhost:8080/schedule");
      const data = await res.json();
      setSchedule(data);
    };

    fetchSchedule();
  }, []);

  const filterBands = (day) => {
    setDay(day);
  };

  return (
    <div>
      <button onClick={() => filterBands("mon")}>Monday</button>
      <button onClick={() => filterBands("tue")}>Tuesday</button>
      <button onClick={() => filterBands("wed")}>Wednesday</button>
      <button onClick={() => filterBands("thu")}>Thursday</button>
      <button onClick={() => filterBands("fri")}>Friday</button>
      <button onClick={() => filterBands("sat")}>Saturday</button>
      <button onClick={() => filterBands("sun")}>Sunday</button>

      {Object.entries(schedule).map(([stage, days]) => (
        <div key={stage}>
          <h2>{stage}</h2>
          {days[day] &&
            days[day].map((act, index) => (
              <div key={index}>
                <p>
                  {act.start} - {act.end}
                </p>
                <p>{act.act}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
