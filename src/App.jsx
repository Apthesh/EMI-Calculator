// import React from 'react'
import { useState } from "react"
import "./App.css"

function App() {
  let[loanamount,setLoanamount]=useState(0);
  let[interest,setInterest]=useState(1);
  let[years,setYears]=useState(1);

 

  let loanRangechange=(e)=>
  {
   setLoanamount(e.target.value)
  }
  let loanInputchange =(e)=>
  {
    let value =Math.min(Math.max(e.target.value,1),10000000);
    setLoanamount(Number(value))
  } 


  let intrestRangeChange=(e)=>
  {
    setInterest(e.target.value)
  }
  let intrestInputChange=(e)=>
  {
    let value = Math.min(Math.max(e.target.value, 1), 20);
    setInterest(Number(value))
  }


  let yearsInputChange=(e)=>
  {
    let value = Math.min(Math.max(e.target.value, 1), 30);
    setYears(Number(value))
  }
  let yearsRangechange=(e)=>
  {
    setYears(Number(e.target.value))
  }


  let calculateEMI = (principal, rate, time) => {
    let monthlyRate = rate / (12 * 100);
    let totalMonths = time * 12; 
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  };

  function addCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return n.toString().replace(/\B(?=(\d{2})+(?!\d))(?=(\d{3})+\b)/g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  let emi = calculateEMI(loanamount, interest, years).toFixed();
  let formattedEMI = addCommas(emi);

  let totalPayable = (emi * years * 12).toFixed();
  let formattedTotalPayable = addCommas(totalPayable);

  let totalInterest = (totalPayable - loanamount).toFixed();
  let formattedTotalInterest = addCommas(totalInterest);

  let formatedloan=addCommas(loanamount)


  

  return (
    <section>
          <h1>Home Loan EMI Calculator</h1>
    <div className="first"> 

        <div className="left">
          <div className="insmall">
              <label><b>Loan Amount (₹):</b></label>
              <input className="input"  type="number" min="1" max="10000000" placeholder="Enter loan amount" value={loanamount} onChange={loanInputchange} /> 
              <input type="range" min="1" max="10000000" className="accent" value={loanamount} onChange={loanRangechange}/>
          </div>
          <div className="insmall" >
              <label><b>Interest Rate (%):</b></label>
              <input type="number" min="1" max="20" placeholder="Enter the Intrest" onChange={intrestInputChange} value={interest}/>
              <input type="range" min="1" max="20" onChange={intrestRangeChange} value={interest}/>
          </div>
          <div className="insmall">
              <label><b>Tenure years:</b></label>
              <input type="number" min="1" max="30" onChange={yearsInputChange} value={years}/>
              <input type="range" min="1" max="30" onChange={yearsRangechange} value={years}/>
          </div>
        </div>

        <div className="right">
          <div className="rightfirst"> 
             <h1 style={{color:"green"}}>EMI Details</h1>
             <h1> <b>Principal ammount: ₹</b>{formatedloan}</h1>
             <h3>Interest amount: ₹{formattedTotalInterest}</h3>
             <h3>Total amount payable: ₹{formattedTotalPayable}</h3>
          </div>
          <div className="rightsecond">
            <div className="emi"> <h1>The Monthly EMI is:</h1><h2>₹{formattedEMI}</h2></div>
          </div>
        </div>
    </div>
    </section>
  )
}

export default App









//  // useEffect(() => {
//   //   setLoanamount(10000);
//   //   setInterest(1);
//   //   setYears(1);
//   // });





// // let emi = loanamount === 0 || interest === 0 || years === 0 ? 0 : calculateEMI(loanamount, interest, years).toFixed(1);
// // let formattedEMI = addCommas(emi);

// // let totalPayable = loanamount === 0 || interest === 0 || years === 0 ? 0 : (emi * years * 12).toFixed();
// // let formattedTotalPayable = addCommas(totalPayable);

// // let totalInterest = loanamount === 0 || interest === 0 || years === 0 ? 0 : (totalPayable - loanamount).toFixed();
// // let formattedTotalInterest = addCommas(totalInterest);







