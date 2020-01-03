import React from "react";
import ReactDOM from "react-dom";

const defaultState = {
  initialized: false,
  timerRunning: false,
  sessionLength: 25,
  breakLength: 5,
  timeLeft: 1500,
  timerType: "Session",
  intervalID: ""
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  sessionIncrement = () => {
    if (this.state.sessionLength < 60 && this.state.initialized === false) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeft: this.state.timeLeft + 60
      });
    } else if (this.state.sessionLength < 60) {
      this.setState({ sessionLength: this.state.sessionLength + 1 });
    }
  };
  sessionDecrement = () => {
    if (this.state.sessionLength > 1 && this.state.initialized === false) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeft: this.state.timeLeft - 60
      });
    } else if (this.state.sessionLength > 1) {
      this.setState({ sessionLength: this.state.sessionLength - 1 });
    }
  };
  breakIncrement = () => {
    if (this.state.breakLength < 60) {
      this.setState({ breakLength: this.state.breakLength + 1 });
    }
  };
  breakDecrement = () => {
    if (this.state.breakLength > 1) {
      this.setState({ breakLength: this.state.breakLength - 1 });
    }
  };

  startStop = () => {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      this.timer = setInterval(this.countDown, 1000);
    } else {
      document.getElementById("beep").pause();
      document.getElementById("beep").currentTime = 0;
      this.setState({ timerRunning: false });
      clearInterval(this.timer);
    }
  };

  countDown = () => {
    if (this.state.timeLeft !== 0) {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    } else {
      document.getElementById("beep").play();
      if (this.state.timerType === "Session") {
        this.setState({
          timerType: "Break",
          timeLeft: this.state.breakLength * 60
        });
      } else {
        this.setState({
          timerType: "Session",
          timeLeft: this.state.sessionLength * 60
        });
      }
    }
  };

  reset = () => {
    if (this.state.timerRunning) {
      clearInterval(this.timer);
    }
    this.setState(defaultState);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  clockFormat = () => {
    let minutes = Math.floor(this.state.timeLeft / 60);
    let seconds = this.state.timeLeft % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };

  render() {
    return (
      <div id="clock-div">
        <div id="content-container">
          <div id="setup-container">
            <div className="setup-block">
              <div className="setup-label" id="break-label">
                Break Length
              </div>
              <div className="setup-display" id="break-length">
                {this.state.breakLength}
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="setup-button"
                  id="break-increment"
                  onClick={this.breakIncrement}
                >
                  +
                </button>
                <button
                  typ="button"
                  className="setup-button"
                  id="break-decrement"
                  onClick={this.breakDecrement}
                >
                  -
                </button>
              </div>
            </div>
            <div className="setup-block">
              <div className="setup-label" id="session-label">
                Session Length
              </div>
              <div className="setup-display" id="session-length">
                {this.state.sessionLength}
              </div>
              <div className="button-container">
                <button
                  className="setup-button"
                  id="session-increment"
                  onClick={this.sessionIncrement}
                >
                  +
                </button>
                <button
                  className="setup-button"
                  id="session-decrement"
                  onClick={this.sessionDecrement}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div id="timer-container">
            <div id="timer-label">{this.state.timerType}</div>

            <div
              className={
                this.state.timerType === "Session"
                  ? "session-readout"
                  : "break-readout"
              }
              id="time-left"
            >
              {this.clockFormat()}
            </div>
            <div className="button-container" id="action-button-container">
              <button
                type="button"
                className="action-button"
                id="start-stop"
                onClick={this.startStop}
              >
                <i className="fas fa-play"></i>&nbsp;/&nbsp;
                <i className="fas fa-pause"></i>
              </button>
              <button
                type="button"
                className="action-button"
                id="reset"
                onClick={this.reset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <audio
          src="https://luosrestil.github.io/FCCimages/emergency_bell_alarm_small_ring.mp3"
          id="beep"
          ref={audio => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
