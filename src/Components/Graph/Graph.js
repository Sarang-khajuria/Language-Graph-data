import React, {useState} from 'react';
import { BarChart, XAxis, Tooltip, Legend, Bar, YAxis, ResponsiveContainer  } from 'recharts';
import './graph.css';
const Graph = (props) => {
  const url = 'https://api.stackexchange.com/2.2/tags?sort=popular&site=stackoverflow';

  const [chartData, setChartData] = useState([]);
  const [page, setpage] = useState();
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [pageSize, setPageSize] = useState();
  const fetchData = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      setChartData(data.items);
    })
  }

  const generateUrl = () => {
    let res = url;
    if(pageSize)
      res+= `&pagesize=${pageSize}`
    if(fromDate)
      res+= `&fromDate=${fromDate}`
    if(toDate)
      res+= `&toDate=${toDate}`
    if(page)
      res+= `&page=${page}`
    return res;
  }

  const submit = () => {
    fetchData(generateUrl())
  }

  React.useEffect(() => {
    fetchData(`${url}&pagesize=15`)
  },[])

  return(
    <div className="main-graph">
      {
        chartData.length
        ? <ResponsiveContainer width="95%" height={500}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis width={100}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        : null
      }
      <div >
        <div>
          <section>
            <label>From Date:</label>
            <input className='input' onChange={(e) => setFromDate(e.target.value)} type="date" max={new Date().toISOString().split("T")[0]}placeholder="From Date" id="fromDate"/>
          </section>
          <section>
            <label>To Date:</label>
            <input className='input' onChange={(e) => setToDate(e.target.value)} type="date" placeholder="To Date" id="toDate"/>
          </section>
          <section>
            <label>Page Size:</label>
            <input className='input' onChange={(e) => setPageSize(e.target.value)} type="number" placeholder="Page Size" id="pageSize"/>
          </section>
          <section>
            <label>Page:</label>
            <input className='input' onChange={(e) => setpage(e.target.value)} type="number" placeholder="Page" id="page" min="0"/>
          </section>
        </div>
        <button onClick={submit}>Change Data</button>
      </div>
    </div>)
}

export default Graph;