import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    period: "AM",
  });

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      let hour = date.getHours();
      const minute = date.getMinutes();
      const period = hour >= 12 ? "PM" : "AM";

      if (hour === 0) {
        hour = 12;
      } else if (hour > 12) {
        hour = hour - 12;
      }

      setTime({
        hour,
        minute,
        period,
      });
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="text-sm text-center bg-white rounded-full px-4 py-2 border">
      {time.hour.toString().padStart(2, "0")}:
      {time.minute.toString().padStart(2, "0")} {time.period}
    </h1>
  );
};

export default Clock;
