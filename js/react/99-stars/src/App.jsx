import './App.css'
import React from "react";
import Control from './components/Control'
import Plot from './components/Plot'

function App() {
  const [plotArray, setPlotArray] = React.useState([0,1,0])
  const [formData, setFormData] = React.useState({
    numberOfStars: 3,
    rows: 3,
    columns: 2,
  })

  //console.log(formData)
  //console.log(plotArray)

  function buildRow(position, size) {
    const newrow = array(size).fill(0)
    newrow[position] = 1;
    return [...newrow];
  }

  function giveMePlot(n) {
    //console.log(`give me plot for ${n}`);
    const cache = [];
    const solution = [];
    for (let i = 1; i <= n; i++) {
      if (i <= n / 2) {
        solution.push(i-1);
        cache.push(i-1);
      } else {
        if (n % 2 != 0 && i == Math.floor(n / 2 + 1)) {
          //special use case for odd numbers
          solution.push(i-1);
        } else {
          solution.push(cache.pop());
        }
      }
    }
    //console.log(solution);
    return solution;
  }

  function handleChange(event) {
    //console.log(`typing... ${event.target} `)
    const {name, value} = event.target
    const numeric = parseInt(value)
    if(numeric && numeric <=190) {
      setFormData(prev => {
        return {
          ...prev,
          [name]: numeric,
          columns: (numeric % 2 === 0)? numeric/2 : Math.floor(numeric/2 +1),
          rows: numeric
        }
      })
      setPlotArray([]);
    }
  }

  function handleCompute(event) {
    event.preventDefault();
    //console.log(`computing for ${formData.numberOfStars} stars`);
    const arr = giveMePlot(formData.numberOfStars);
    //console.log(arr);
    setPlotArray(arr);
  }

  return (
    <>
       <Plot rows={formData.rows} columns={formData.columns} data={plotArray}/>
       <Control handleChange={handleChange} handleCompute={handleCompute} formData={formData} />
    </>
  )
}

export default App
