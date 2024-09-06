import React, { useEffect, useState } from "react";
import axios from "axios";

const ExchangeRate = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "USD"];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://api.currencyfreaks.com/latest?apikey=b72069c2dda6448a8e5c1a6914525528`
        );
        setRates(response.data.rates);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const calculateWeBuy = (rate) => (rate * 1.02).toFixed(4); // Logika 'We Buy'
  const calculateWeSell = (rate) => (rate * 0.98).toFixed(4); // Logika 'We Sell'

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{calculateWeBuy(rates[currency])}</td>
              <td>{parseFloat(rates[currency]).toFixed(4)}</td>
              <td>{calculateWeSell(rates[currency])}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">* base currency is IDR</td>
          </tr>
          <tr>
            <td colSpan="4">
              * As for the API:{" "}
              <a href="https://exchangeratesapi.io/">
                https://exchangeratesapi.io/
              </a>{" "}
              is used.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExchangeRate;
