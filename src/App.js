import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [bill1, setBill1] = useState(0);
  const [exchange, setExchange] = useState();
  const [exKeys, setExKeys] = useState();
  const [exValue, setExValue] = useState();
  const inputChange = async (e) => {
    await setBill1(e.target.value);
  }

  const exchangeBill = async () => { // 환율 api 정보 받아오기
    await axios.get('https://v6.exchangerate-api.com/v6/dcbd7ca5451d89ec329f7cbd/latest/USD')
    .then(res => {
      setExchange(res.data.conversion_rates)
    })
  }
  
  const setKeysAndValues = async () => { // key와 value로 나눔
    setExKeys(Object.keys(exchange));
    setExValue(Object.values(exchange));
  }

  useEffect(() => {
    exchangeBill()
  }, [])

  useEffect(() => {
    setKeysAndValues()
  }, [exchange])

  return (
    <div>
      <select name='country'>
      </select>
      <input type='text' name='getBill' onChange={e => inputChange(e)} />
    </div>
  );
}

export default App;
