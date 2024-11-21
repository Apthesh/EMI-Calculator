import  { useState } from 'react';

function App() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(10000000);
  const [checkBoxValue, setCheckBoxValue] = useState('');

  const handleCheckBoxChange = (e) => {
    const checkBoxValue = e.target.value;
    setCheckBoxValue(checkBoxValue);

    switch (checkBoxValue) {
      case '0to10000000':
        setRangeMin(0);
        setRangeMax(10000000);
        break;
      case '1crto5cr':
        setRangeMin(10000000);
        setRangeMax(50000000);
        break;
      case '5crto30cr':
        setRangeMin(50000000);
        setRangeMax(300000000);
        break;
      default:
        setRangeMin(0);
        setRangeMax(10000000);
    }
  };

  const handleRangeChange = (e) => {
    setLoanAmount(e.target.value);
  };

  return (
    <div>
      <input
        type="checkbox"
        value="0to10000000"
        checked={checkBoxValue === '0to10000000'}
        onChange={handleCheckBoxChange}
      />
      0 to 10000000

      <input
        type="checkbox"
        value="1crto5cr"
        checked={checkBoxValue === '1crto5cr'}
        onChange={handleCheckBoxChange}
      />
      1cr to 5cr

      <input
        type="checkbox"
        value="5crto30cr"
        checked={checkBoxValue === '5crto30cr'}
        onChange={handleCheckBoxChange}
      />
      5cr to 30cr

      <input type="range" min={rangeMin} max={rangeMax} value={loanAmount} onChange={handleRangeChange} />
      
      
      <input
        type="number"
        value={loanAmount}
        onChange={handleRangeChange}
      />
    </div>
  );
}

export default App;














// const formatInputValue = (value) => {
//   return value.toLocaleString('en-IN');
// };

// const loanInputchange = (e) => {
//   const inputValue = e.target.value.replace(/[^\d]/g, ''); 
//   const formattedValue = formatInputValue(inputValue);
//   setLoanAmount(formattedValue);
// };

// <input
//   className="input"
//   type="number"
//   placeholder="Enter loan amount"
//   value={loanamount}
//   onChange={loanInputchange}
// />



// add comas to input

// function loanInputchange(e) {
//   const loanAmount = e.target.value.replace(/\B(?=(\d{2})+(?!\d))(?=(\d{3})+\b)/g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   e.target.value = loanAmount;
// }

// function loanRangechange(e) {
//   const loanAmount = e.target.value.replace(/\B(?=(\d{2})+(?!\d))(?=(\d{3})+\b)/g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   document.querySelector('input[type="number"]').value = loanAmount;
// }






















































































import { useReducer } from "react";
import "./App.css";

// Initial state
const initialState = {
  loanamount: 1,
  interest: 1,
  years: 1,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOAN_AMOUNT":
      return { ...state, loanamount: action.payload };
    case "SET_INTEREST":
      return { ...state, interest: action.payload };
    case "SET_YEARS":
      return { ...state, years: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loanamount, interest, years } = state;

  const loanRangechange = (e) => {
    dispatch({ type: "SET_LOAN_AMOUNT", payload: e.target.value });
  };

  const loanInputchange = (e) => {
    let value = Math.min(Math.max(e.target.value, 1), 10000000);
    dispatch({ type: "SET_LOAN_AMOUNT", payload: Number(value) });
  };

  const intrestRangeChange = (e) => {
    dispatch({ type: "SET_INTEREST", payload: e.target.value });
  };

  const intrestInputChange = (e) => {
    let value = Math.min(Math.max(e.target.value, 1), 20);
    dispatch({ type: "SET_INTEREST", payload: Number(value) });
  };

  const yearsInputChange = (e) => {
    let value = Math.min(Math.max(e.target.value, 1), 30);
    dispatch({ type: "SET_YEARS", payload: Number(value) });
  };

  const yearsRangechange = (e) => {
    dispatch({ type: "SET_YEARS", payload: Number(e.target.value) });
  };

  const calculateEMI = (principal, rate, time) => {
    let monthlyRate = rate / (12 * 100);
    let totalMonths = time * 12;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  };

  const addCommas = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const emi = calculateEMI(loanamount, interest, years).toFixed();
  const formattedEMI = addCommas(emi);

  const totalPayable = (emi * years * 12).toFixed();
  const formattedTotalPayable = addCommas(totalPayable);

  const totalInterest = (totalPayable - loanamount).toFixed();
  const formattedTotalInterest = addCommas(totalInterest);

  const formatedloan = addCommas(loanamount);

  return (
    <section>
      <h1>Home Loan EMI Calculator</h1>
      <div className="first">
        <div className="left">
          <div className="insmall">
            <label><b>Loan Amount (₹):</b></label>
            <input
              className="input"
              type="number"
              min="1"
              max="10000000"
              placeholder="Enter loan amount"
              value={loanamount}
              onChange={loanInputchange}
            />
            <input
              type="range"
              min="1"
              max="10000000"
              className="accent"
              value={loanamount}
              onChange={loanRangechange}
            />
          </div>
          <div className="insmall">
            <label><b>Interest Rate (%):</b></label>
            <input
              type="number"
              min="1"
              max="20"
              placeholder="Enter the Interest"
              onChange={intrestInputChange}
              value={interest}
            />
            <input
              type="range"
              min="1"
              max="20"
              onChange={intrestRangeChange}
              value={interest}
            />
          </div>
          <div className="insmall">
            <label><b>Tenure years:</b></label>
            <input
              type="number"
              min="1"
              max="30"
              onChange={yearsInputChange}
              value={years}
            />
            <input
              type="range"
              min="1"
              max="30"
              onChange={yearsRangechange}
              value={years}
            />
          </div>
        </div>

        <div className="right">
          <h2>EMI Details</h2>
          <p><b>Monthly EMI (₹):</b> {formattedEMI}</p>
          <p><b>Total Payable (₹):</b> {formattedTotalPayable}</p>
          <p><b>Total Interest (₹):</b> {formattedTotalInterest}</p>
        </div>
      </div>
    </section>
  );
}

export default App;
































// const reducer = (state, action) => {
//   if (action.type === "SET_LOAN_AMOUNT") {
//     return { ...state, loanamount: action.payload };
//   } else if (action.type === "SET_INTEREST") {
//     return { ...state, interest: action.payload };
//   } else if (action.type === "SET_YEARS") {
//     return { ...state, years: action.payload };
//   } else {
//     return state;
//   }
// };