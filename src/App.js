/* global chrome */
import React, { useState, useEffect } from 'react';
import deleteIcon from "./delete-icon.png";
import './App.css';

const App = () => {
  const [description, setDescription] = useState("");
  const [tabDetails, setTabDetails] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("tabDetails") != null) {
      setTabDetails(JSON.parse(localStorage.getItem("tabDetails")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tabDetails", JSON.stringify(tabDetails));
  }, [tabDetails]);

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
    setTabDetails([]);
  }

  const handleDelete = (item) => {
    const itemIndex = tabDetails.indexOf(item);
    tabDetails.splice(itemIndex, 1);
    const updateTabDetails = [...tabDetails];
    setTabDetails(updateTabDetails);
  }

  return (
    <div>
      <h1>My Tabs</h1>
      <input type="text" maxLength="100" name="about" placeholder="oneline info for this tab" value={description} onChange={event => setDescription(event.target.value)} /><br />
      <button type="button" onClick={handleSave}>SAVE</button>
      <button type="button" onDoubleClick={handleDeleteAll}>DELETE ALL</button>
      <div className="table-container">
        <table>
          {tabDetails.length > 0 &&
            <tr>
              <th>Tab</th>
              <th>Description</th>
              <th></th>
            </tr>
          }
          {tabDetails.map((item) => {
            return (
              <tr>
                <td><a rel="noreferrer" target="_blank" href={item.url}>{item.url}</a></td>
                <td>{item.about}</td>
                <td><img id={item.id} src={deleteIcon} alt="delete icon" onDoubleClick={(item) => handleDelete(item)}/></td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default App;
