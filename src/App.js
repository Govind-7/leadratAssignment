import { Component } from "react";
import Seat from "./components/Seat";
import { MdOutlineEventSeat } from "react-icons/md";
import "./App.css";

class App extends Component {
  state = {
    seatData: [],
    seatSelected: [],
    cost: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const url = "http://localhost:5000/data";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ seatData: data });
  };

  seatSelecting = (data) => {
    const { ticketNo, bookingStatus } = data;
    // console.log(data);
    const { seatSelected } = this.state;
    const file = seatSelected.filter((item) => item === ticketNo);
    if (file.length === 0 && bookingStatus === 0) {
      this.setState((prev) => ({
        seatSelected: [...prev.seatSelected, ticketNo],
        cost: [...prev.cost, data],
      }));
    } else {
      this.setState((prev) => ({
        seatSelected: prev.seatSelected.filter((item) => item !== ticketNo),
        cost: prev.cost.filter((item) => item.ticketNo !== ticketNo),
      }));
    }
  };

  proceedToBook = async () => {
    const { seatSelected } = this.state;

    const data = { seats: seatSelected };
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    // console.log(data);

    this.setState({ seatSelected: [] }, this.getData);
    const response = await fetch("http://localhost:5000/book", options);
    await response.json();
    // console.log(jsonData);
  };

  render() {
    const { seatData, cost, seatSelected } = this.state;
    const qPart = seatData.slice(0, 10);
    const pPart = seatData.slice(10, 20);
    const oPart = seatData.slice(20, 35);
    const nPart = seatData.slice(35, 50);
    const mPart = seatData.slice(50, 65);
    const lPart = seatData.slice(65, 80);
    const kPart = seatData.slice(80, 95);
    const jPart = seatData.slice(95, 110);
    const iPart = seatData.slice(110, 125);

    let totalCost = 0;
    cost.map((item) => (totalCost += item.ticketPrice));
    const noOfSeateSelected = cost.length;
    const sData = seatSelected.join(",");

    // console.log(noOfSeateSelected);
    return (
      <div>
        <h1>User Interface</h1>
        <div className="seats-instructions">
          <div className="seats-bg">
            <div className="special">
              <p className="special-number">Q</p>
              <div className="business-class">
                {qPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
                <p className="premium">Premium</p>
              </div>
            </div>
            <div className="special">
              <p className="special-number">P</p>
              <div className="business-class">
                {pPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
                <p className="premium">Premium</p>
              </div>
            </div>
            <div className="special">
              <p className="special-number">O</p>
              <div className="seat">
                {oPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
              </div>
            </div>

            <div className="special">
              <p className="special-number">N</p>

              <div className="seat">
                {nPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
              </div>
            </div>
            <div className="special">
              <p className="special-number">M</p>
              <div className="seat">
                {mPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
              </div>
            </div>
            <div className="special">
              <p className="special-number">L</p>
              <div className="seat">
                {lPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
              </div>
            </div>
            <div className="special">
              <p className="special-number">K</p>
              <div className="seat">
                {kPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
              </div>
            </div>
            <div className="special">
              <p className="special-number">J</p>
              <div className="seat">
                {jPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
              </div>
            </div>
            <div className="special">
              <p className="special-number">I</p>
              <div className="seat">
                {iPart.map((item) => (
                  <Seat
                    seatSelecting={this.seatSelecting}
                    selc={seatSelected}
                    dat={item}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="seat">
              <button className="seat-selected">
                <MdOutlineEventSeat />
              </button>
              <p> Your Selection</p>
            </div>
            <div className="seat">
              <button className="seat-booked">
                <MdOutlineEventSeat />
              </button>
              <p>Unavailble</p>
            </div>
            <div className="seat">
              <button className="seat-item">
                <MdOutlineEventSeat />
              </button>
              <p>Availble</p>
            </div>
          </div>
        </div>

        {seatSelected.length !== 0 ? (
          <div className="proceed-container">
            <button className="proceed-button" onClick={this.proceedToBook}>
              Proceed
            </button>
            <div className="seats-total-cost">
              <p>Total Seats you selected : {noOfSeateSelected}</p>
              <p>Total cost need to pay : {totalCost}</p>
              <p>Seats numbers you selected {sData}</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
