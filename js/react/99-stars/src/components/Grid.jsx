import React from "react";

export default function Grid(props) {
  //console.log(`rendering Grid with props: ${props.data} cols: ${props.columns} rows: ${props.rows}`);

  function fillRow(markedPosition, rowNumber) {
    //console.log(`markedPosition: ${markedPosition}, rowNumber:${rowNumber}`)
    const cols = [...Array(props.columns).keys()];
    const colsArray = cols.map((e, index) => {
      const keyUnique = (rowNumber+1)*(index+1);
      //console.log(`colsKeyUnique: ${keyUnique}`);
      return <td key={keyUnique} className={index === markedPosition ? "marked": ""}>★</td>
    });

    //console.log(`colsArray: ${colsArray}`);
    return colsArray;
  }

  const allRows = [...Array(props.rows).keys()].map( (e, index) => {
    const keyUnique = props.rows*props.columns+index+1;
    //console.log(`row keyUnique: ${keyUnique}`);
    const cols = <tr key={keyUnique}>{fillRow(props.data[index],index)}</tr>
    //console.log(`cols: ${cols}`)
    return cols
  })

  return (
  <div className="grid">
      <table className="grid--table">
        <tbody>
          {allRows}
        </tbody>
      </table>
    </div>
  )
}
