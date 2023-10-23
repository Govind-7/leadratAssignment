import { MdOutlineEventSeat } from "react-icons/md";
import "./index.css";

const Seat = (props) => {
  const { dat, seatSelecting, selc } = props;
  const { bookingStatus, ticketNo } = dat;
  //   console.log(selc);

  let selcClass = "seat-item";

  const a = selc.filter((item) => item === ticketNo);
  if (a[0] === ticketNo) {
    selcClass = "seat-selected";
  }

  const func = () => {
    seatSelecting(dat);
    // console.log(ticketNo);
  };

  if (!bookingStatus) {
    return (
      <button onClick={func} className={selcClass}>
        <MdOutlineEventSeat />
      </button>
    );
  } else {
    return (
      <button onClick={func} className="seat-booked">
        <MdOutlineEventSeat />
      </button>
    );
  }
};

export default Seat;
