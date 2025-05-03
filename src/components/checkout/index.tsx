import Clock from "../clock";
import Date from "../date";

const Checkout = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <Date />
        <Clock />
      </div>
    </div>
  );
};

export default Checkout;
