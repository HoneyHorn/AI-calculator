import React from "react";
import ReactDOM from "react-dom";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 1000;

class ReactRange extends React.Component {
  state = {
    values: [0]
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin: "2em",
          alignItems: "center"
        }}
      >
    <span>{MIN}</span>
      <Range
        values={this.state.values}
        step={STEP}
        min={MIN}
        max={MAX}
        // rtl={rtl}
        onChange={(values) => {
            this.setState({ values });
            }
        }
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '75%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: this.state.values,
                  colors: ['#506cff', '#ccc'],
                  min: MIN,
                  max: MAX,
                  // rtl
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '18px',
              width: '18px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
              border: 'solid',
              borderColor: '#506cff',
              outline: 'none'
            }}
          >
            <div
              id={this.props.id}
              style={{
                position: 'absolute',
                top: '-28px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: '#506cff'
              }}
            >
              {this.state.values[0]}
            </div>
            <div
              style={{
                height: '5px',
                width: '5px',
                backgroundColor: 'white'
              }}
            />
          </div>
        )}
      />
      <span>{MAX}</span>
      </div>
    );
  }
}

export default ReactRange;

const rootElement = document.getElementById("root");
ReactDOM.render(<ReactRange />, rootElement);
