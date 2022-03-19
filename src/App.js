/* global chrome */
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [description, setDescription] = useState("");
  const [tabDetails, setTabDetails] = useState([]);

  const handleSave = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const updateTabDetails = [
        ...tabDetails,
        {
          url: tabs[0].url,
          description: description
        }
      ];
      setTabDetails(updateTabDetails);
      setDescription("");
    });
  }

  const handleDeleteAll = () => {

  }

  return (
    <div>
      <h1>My Tabs</h1>
      <input type="text" maxLength="100" name="about" placeholder="oneline info for this tab" value={description} onChange={event => setDescription(event.target.value)} /><br />
      <button type="button" onClick={handleSave}>SAVE</button>
      <button type="button" onClick={handleDeleteAll}>DELETE ALL</button>
    </div>
  );
}
export default App;
