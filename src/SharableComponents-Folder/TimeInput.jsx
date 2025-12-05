import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const TimeInput = ({ value, onChange }) => {
  const [hour, setHour] = useState(value.hour);
  const [minute, setMinute] = useState(value.minute);

  const pad = (num) => String(num).padStart(2, "0");

  const adjustTime = (unit, delta) => {
    let newHour = hour;
    let newMinute = minute;

    if (unit === "hour") newHour = (hour + delta + 24) % 24;
    if (unit === "minute") newMinute = (minute + delta + 60) % 60;

    setHour(newHour);
    setMinute(newMinute);
    onChange({ hour: newHour, minute: newMinute });
  };

  return (
    <div className="relative w-28 border flex items-center justify-center">

      <input
        type="text"
        value={`${pad(hour)}:${pad(minute)}`}
        readOnly
        className="w-full text-center py-2 px-1 bg-white focus:outline-none text-sm font-medium"
      />

      <div className="absolute inset-y-0 right-0 flex flex-col text-gray-500">
        <button
          type="button"
          onClick={() => adjustTime("hour", 1)}
          className="p-0.5 hover:bg-gray-100"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={() => adjustTime("hour", -1)}
          className="p-0.5 hover:bg-gray-100"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default TimeInput;
