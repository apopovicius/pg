import React from "react";
import Grid from "./Grid";

export default function Plot(props) {
  return (
    <section className="plot">
      <h2> Plotting a star formed with {props.rows} points</h2>
      <Grid rows={props.rows} columns={props.columns} data={props.data}/>
    </section>
  )
}
