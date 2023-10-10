import React from "react";

export default function Control(props) {
  return (
    <>
      <form className="form" onSubmit={props.handleCompute}>
        <label htmlFor="numberOfStars" className="form--label">number of stars:</label>
        <input type="number"
          min="3"
          max="190"
          id="numberOfStars"
          placeholder="insert number of stars"
          name="numberOfStars"
          onChange={props.handleChange}
          value={props.formData.numberOfStars}
          className="form--text"
        />
        <button className="form--button">Draw stars!</button>
    </form>
    </>
  )
}
