import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [inputText, setInputText] = useState(1);
  const [coins, setCoins] = useState([]);
  const onChange = (event) => {
    setInputText(event.target.value);
    console.log(inputText);
  };
  const calculate = (event) => {
    setAmount(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers").then((response) =>
      response.json().then((json) => {
        setCoins(json);
        setLoading(false);
      })
    );
  }, []);

  return (
    <div>
      <h1>사용 가능한 코인 종류 ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <label htmlFor="amount">Amount : </label>
          <input
            onChange={calculate}
            value={amount}
            type="number"
            id="amount"
          />

          <select onChange={onChange}>
            <option value="0">Please Select</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} {coin.symbol}: {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <hr />
          <label htmlFor="result">You can buy </label>
          <p>{amount / inputText} </p>
        </div>
      )}
    </div>
  );
}

export default App;
