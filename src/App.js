import React, { useState } from 'react';
import "./App.css";

function App() {
  const [form, setForm] = useState({ url: '' });
  const [response, setResponse] = useState();
  const [responseData, setResponseData] = useState();
  const [request, setRequest] = useState();
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const pushRequest = async () => {
    const options = {
      method: 'GET',
    };

    const response = await fetch(form.url, options);
    const data = await response.json();
    setResponseData(JSON.stringify(data, null, 2));
    setRequest(`Request:\n\nURL: ${form.url}\nOptions: ${JSON.stringify(options, null, 2)}`);

    let imagesList = [];

    for (let key in data) {
      if (typeof data[key] === 'string' && (data[key].endsWith('.jpg') || data[key].endsWith('.png'))) {
        imagesList.push({ key, url: data[key] });
      }
    }
    setResponse(`Response:\n\nok: ${response.ok}\nstatus: ${response.status}\nstatusText: ${response.statusText}\nheaders: ${JSON.stringify(Array.from(response.headers.entries()), null, 2)}`);
    setImages(imagesList);
  }

  return (
    <div className="App">
      <div className="input-wrapper">
        <input
          value={form.url}
          placeholder='URL'
          onChange={handleChange}
          name='url'
        />
        <button onClick={pushRequest}>GET</button>
      </div>
      {request && (
        <>
          <p className='title'>Request</p>
          <pre>
            {request}
          </pre>
        </>
      )}
      {response && (
        <>
        <p className='title'>Response</p>
          <pre>
            {response}
          </pre>
        </>
      )}
      {responseData && (
        <>
        <p className='title'>Response-Data</p>
          <pre>
            {responseData}
          </pre>
          {images.map((image, index) => (
            <>
            <p className='title'>Response-Image #{index}</p>
            <pre key={index}>
              "{image.key}": <img src={image.url} alt={image.key} style={{ width: '100px', height: '100px' }} />
            </pre>
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
