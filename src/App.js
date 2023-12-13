import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [datemp, setDatemp] = useState("");
  const [title, setTitle] = useState("");
  const [descript, setDescript] = useState("");
  const [object, setObject] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState({});

  const val = useRef("");
  const val2 = useRef("");

  const obj = () => {
    const newItem = {
      title: title,
      descript: descript,
      day: getDayName(datemp),
    };

    setObject((prevObject) => [...prevObject, newItem]);

    // Update selected date data
    setSelectedDateData((prevData) => ({
      ...prevData,
      [datemp]: [...(prevData[datemp] || []), newItem],
    }));

    setTitle("");
    setDescript("");
  };

  const getDayName = (dateString) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = new Date(dateString);
    const dayName = days[d.getDay()];
    return dayName;
  };

  const titleset = () => {
    setTitle(val.current.value);
  };

  const descset = () => {
    setDescript(val2.current.value);
  };

  const datea = (e) => {
    const selectedDate = e.target.value;
    setDatemp(selectedDate);
    setSelectedDate(selectedDate);
  };

  return (
    <div className="App">
      <div className="main">
        <div  className="tit">
          <input className="t" ref={val} onChange={titleset} type="text" value={title} placeholder="Title" />
          <input className="b" type="date" onClick={datea} />
        </div>
        <div className="tit">
          <input className="t" type="text" ref={val2} onChange={descset} value={descript} placeholder="Description" />
          <button  className="b" onClick={obj}>Save</button>
        </div>
      </div>

      <div className="days">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <h1 key={day}  className={selectedDate && getDayName(selectedDate) === day ? 'highlighted' : 'box'}>{day}</h1>
        ))}
      </div>

      <div>
        {selectedDateData[selectedDate]?.map((e, index) => (
          <div key={index} className="descrop">
            <div className="endc">

            <h1>{e.title}</h1>
            <p>{e.descript}</p>
            </div>
            <div>
            <button className="btn">delete</button>

              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
