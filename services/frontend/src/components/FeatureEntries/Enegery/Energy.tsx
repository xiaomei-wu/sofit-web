'use client';

import { useState } from 'react';
import styles from './Energy.module.css';

export default function Energy() {
  const [state, setState] = useState({
    startDate: new Date().toISOString().split('T')[0],
    startTime: new Date()
      .toLocaleTimeString('en-US', { hour12: false })
      .substring(0, 5),
    energyLevel: 5,
    editing: false,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const energyEntry = state;

    // Implement your logic for handling the form submission here
    // You can use axios or fetch API to make an HTTP request
    // to your API endpoint for saving energy entries
  };

  const handleDelete = event => {
    event.preventDefault();

    // Implement your logic for deleting energy entries here
  };

  const handleEditing = event => {
    event.preventDefault();

    const updatedEnergy = state;

    // Implement your logic for editing energy entries here
  };

  return (
    <div className="flex flex-column">
      <div className="flex flex-column items-center">
        <form
          action="POST"
          className={styles.wrapper}
          onSubmit={state.editing ? handleEditing : handleSubmit}
        >
          <label className="f6 mt3" htmlFor="start-date">
            Date:
          </label>
          <input
            className="mb2"
            id="start-date"
            name="startDate"
            onChange={handleChange}
            type="date"
            value={state.startDate}
          />

          <label className="f6 mt3" htmlFor="start-time">
            Time:
          </label>
          <input
            className="mb2"
            id="start-date"
            name="startTime"
            onChange={handleChange}
            type="time"
            value={state.startTime}
          />

          <label className=" f6 mt3" htmlFor="energyLevel">
            Energy Level:
          </label>
          <input
            className="mt1 mb3"
            max="10"
            min="1"
            name="energyLevel"
            onChange={handleChange}
            type="range"
            value={state.energyLevel}
          />

          <button
            className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-blue br-pill b--dark-blue"
            type="submit"
          >
            Save
          </button>
        </form>

        <button
          className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-red br-pill b--dark-red"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
