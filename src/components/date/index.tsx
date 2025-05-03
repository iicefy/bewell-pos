import { useEffect, useState } from "react";

const DateComponent = () => {
  const [date, setDate] = useState({
    day: 0,
    month: "",
    year: 0,
  });

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();

      setDate({
        day,
        month,
        year,
      });
    };

    const intervalId = setInterval(updateDate, 1000);

    updateDate();

    return () => clearInterval(intervalId);
  }, []);
  // This effect runs only once when the component mounts

  return (
    <div>
      <h1 className="text-sm text-center flex justify-center items-center bg-white rounded-full px-4 h-9 border">
        {date.day.toString().padStart(2, "0")} {date.month} {date.year}
      </h1>
    </div>
  );
};

export default DateComponent;
