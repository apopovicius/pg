import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391": "#E7E7E7"
  }
  function dieNumber(props) {
    switch (props.value) {
      case 1:
        return (
          <div className="first-face" style={styles} onClick={props.holdDice}>
            <span className="pip"></span>
          </div>
        )

      case 2:
        return (
          <div className="second-face"  style={styles} onClick={props.holdDice}>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        )

      case 3:
        return (
          <div className="third-face" style={styles} onClick={props.holdDice} >
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        )

      case 4:
        return (
          <div className="fourth-face" style={styles} onClick={props.holdDice}>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="fifth-face" style={styles} onClick={props.holdDice}>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
            <div className="column">
              <span className="pip"></span>
            </div>
            <div className="column">
              <span className="pip"></span>
            <span className="pip"></span>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="sixth-face" style={styles} onClick={props.holdDice}>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
              <span className="pip"></span>
              </div>
            </div>
        )
      default:
        console.log('Wrong dice number')
        return
    }
  }

  return (
    <>
      {dieNumber(props)}
    </>
  );
}
