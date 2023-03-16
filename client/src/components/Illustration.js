import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';

var PolicyData = {
  Policy_Year: 0,
  Premium: 0,
  Sum_Assured: 0,
  Bonus_Rate: 0,
  Bonus_Amount: 0,
  Total_Benefit: 0,
  Net_CashFlow: 0
}


export default function Illustration(props) {

  function NPV(discountRate, cashFlow) {
    var npv = 0;
    for (var t = 0; t < cashFlow.length; t++) {
      npv += cashFlow[t] / Math.pow((1 + discountRate), t);
    }
    return npv;
  }


  function IRR(cashFlow, guess) {
    guess = guess ? guess : 0.1;
    var npv;
    do {
      npv = NPV(guess, cashFlow);
      guess += 0.001;

    }
    while (npv > 0)

    return guess;
  }

  const bonus_rate = [2.50, 3, 3.50, 3.50, 3.50, 3.50, 3, 3, 3, 3, 3, 2.50, 3, 3, 2.50, 5, 4, 4.50, 4, 25];

  const [table, setTable] = useState();
  const [iir, setIir] = useState();

  useEffect(() => {
    calculatePolicy()
  }, [])

  useEffect(() => {
    if (table) {
      var cashFlow = table.map((item) => item.Net_CashFlow);
      console.log(cashFlow);
      setIir(IRR(cashFlow))
    }
  }, [table])

  const calculatePolicy = async () => {
    // Validate Data
    const finalResult = []
    // Calculate Bonus Amount First;
    var bonus_amount = await bonus_rate.map(e => e * parseFloat(props.sum_assured));

    // Loop through Policy Year from 1 to 20
    for (var i = 1; i <= 20; i++) {
      var tempPolicy = Object.create(PolicyData)

      tempPolicy.Policy_Year = i;

      if (i <= parseInt(props.ppt)) {
        tempPolicy.Premium = parseFloat(props.premium)
      }

      if (parseInt(props.pt) === i) {
        tempPolicy.Sum_Assured = parseFloat(props.sum_assured);
        tempPolicy.Total_Benefit = tempPolicy.Sum_Assured + bonus_amount.reduce((a, b) => a + b, 0)
        tempPolicy.Net_CashFlow = tempPolicy.Total_Benefit;
      } else {
        tempPolicy.Net_CashFlow = tempPolicy.Sum_Assured - tempPolicy.Premium;
      }

      tempPolicy.Bonus_Rate = bonus_rate[i - 1];

      tempPolicy.Bonus_Amount = bonus_amount[i - 1];
      finalResult.push(tempPolicy)
    }
    setTable(finalResult)
  }

  const LoadTable = () => {
    return table.map((item, index) => {
      return (
        <tr key={"rowIndex" + index}>
          <td>{item.Policy_Year}</td>
          <td>{item.Premium}</td>
          <td>{item.Sum_Assured}</td>
          <td>{item.Bonus_Rate}</td>
          <td>{item.Bonus_Amount}</td>
          <td>{item.Total_Benefit}</td>
          <td>{item.Net_CashFlow}</td>
        </tr>
      )
    })
  }

  return (
    <Container>
      <p className='display-6'>IRR - {iir ? iir.toPrecision(3) : null}%</p>
      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="table" className="table align-items-center justify-content-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Policy Year</th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Premium</th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Sum Assured</th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Bonus Rate</th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Bonus Amount</th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Total Benifit</th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Net Cashflow</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {table ? LoadTable() : null}
            </tbody>
          </table>
        </div>
      </div >
    </Container >
  )
}
