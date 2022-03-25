import React, { Component } from 'react';
import './Chrono.css';

const PadWith0 = ({ nbr }) =>
  String(nbr).length < 2 ? `0${nbr}` : String(nbr);

const TimeFormat = ({ nbr }) => {
  const sec = nbr % 60;
  const min = ((nbr - sec) % 3600) / 60;
  const hours = ~~(nbr / 3600);

  return (
    <div style={{textAlign: "center"}}>
      <PadWith0 nbr={hours} />:<PadWith0 nbr={min} />:<PadWith0 nbr={sec} />
    </div>
  );
};

class Chrono extends Component {
    state = { time: 0, running: false, };
    timer = null;
  
  start = () => { 
    this.timer = setInterval(this.tick, 1000);
    this.setState({ running: true });
  };
  
  stop = () => { 
    clearInterval(this.timer);  
    this.setState({ running: false });
  };
  
  reset = () => this.setState({ time: 0 });

  tick = () => this.setState({ time: this.state.time + 1 });

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.state.running) {
        this.stop();
      }
  }

  render() {
    const { time, running } = this.state;
    return (
        <div className="demochrono">
        <TimeFormat nbr={time} />
        <div className="controls">
          {running ? (
            <button onClick={this.stop}>Stop</button>
          ) : (
            <button onClick={this.start}>Start</button>
          )}
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

const ChronoComponent = () => (
  <>
    <Chrono />
  </>
);

export default ChronoComponent;
