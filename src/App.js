import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function App() {
  let defaultCountry = 'USD'; // default value
  const API_KEY = 'dcbd7ca5451d89ec329f7cbd';
  const [bill1, setBill1] = useState({
    selectCountry: '',
    moneyValue: 0,
    selectCountry2: '',
    moneyValue2: 0,
  });
  const [exchange, setExchange] = useState();
  const [exKeys, setExKeys] = useState([]);
  const [optionKeys, setOptionKeys] = useState([]);
  const [exchangeValue, setExchangeValue] = useState(0);

  const exchangeBill = async () => { // 환율 api 정보 받아오기
    await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${defaultCountry}`)
      .then(res => {
        setExchange(res.data.conversion_rates)
      })
  }

  const inputChange = async (e) => { // 환율계산시 필요한 기본정보 받기
    setBill1({
      ...bill1,
      [e.target.name]: e.target.value
    })
  }

  const setKeysAndValues = async () => { // key와 value로 나눔
    setExKeys(Object.keys(exchange));
    await setOptionKeys(exKeys && exKeys.map((data,idx) => <option key={idx} value={data}>{data}</option>));
  }

  const exchangeMoneyValue = async (country, money, country2) => { // 환율정보를 가져와서 환율식에 대입
    return setExchangeValue(((exchange[country2] / exchange[country]) * money).toFixed(4) + country2.toString());
  }

  useEffect(() => { // 랜더링시 API CALL
    exchangeBill()
  }, []);

  useEffect(() => { // 상태값 정의
    setKeysAndValues()
  }, [exchange])

  return (
    <div className='App'>
      <h1 variant="success">환율계산기</h1>
      <div className='app_main'>
        <p className='label-tag'>금액 : </p>
        <input type='text' name='moneyValue' onChange={e => inputChange(e)} placeholder="금액을 입력하세요" />

        <p className='label-tag'>을/를 : </p>
        <Form.Select name='selectCountry' onChange={e => inputChange(e)}>
          {optionKeys}
        </Form.Select>

        <br />
        <p className='label-tag'>(으)로 : </p>
        <Form.Select name='selectCountry2' onChange={e => inputChange(e)}>
          {optionKeys}
        </Form.Select>
        <Button variant="success" onClick={() => exchangeMoneyValue(bill1.selectCountry, bill1.moneyValue, bill1.selectCountry2)}>change</Button><br />
        <div className='exFinalValue'>결과 : {exchangeValue}</div>
      </div>
    </div>
  );
}

export default App;
