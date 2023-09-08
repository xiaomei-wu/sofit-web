'use client';

import { useState } from 'react';
import styles from './Sleep.module.css';

export default function Sleep() {
  const [state, setState] = useState({
    startDate: new Date().toISOString().split('T')[0],
    startTime: new Date()
      .toLocaleTimeString('en-US', { hour12: false })
      .substring(0, 5),
    duration: '',
    notes: '',
    id: '',
    editing: false,
    errors: {},
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleValidation = () => {
    const duration = state.duration;
    const errors = {};
    let formIsValid = true;

    if (!duration) {
      formIsValid = false;
      errors.duration = 'Duration cannot be empty';
    }

    setState({ ...state, errors: errors });
    return formIsValid;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (handleValidation()) {
      const sleepEntry = state;

      // Implement your logic for handling the form submission here
      // You can use axios or fetch API to make an HTTP request
      // to your API endpoint for saving sleep entries
    }
  };

  const handleDelete = event => {
    event.preventDefault();

    const sleepToDeleteId = state.id;

    // Implement your logic for deleting sleep entries here
  };

  const handleEditing = event => {
    event.preventDefault();

    if (handleValidation()) {
      const updatedSleep = state;

      // Implement your logic for editing sleep entries here
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
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

          <div className="f6 mt2">
            <label className="f6 mt3" htmlFor="duration">
              Duration:{' '}
            </label>
            <input
              className="mb2 w3"
              id="duration"
              max="24"
              min="0"
              name="duration"
              onChange={handleChange}
              type="number"
              value={state.duration}
            />
            <span> hrs</span>
          </div>
          <span style={{ color: 'red' }}>{state.errors.duration}</span>

          <label className="f6 mt3" htmlFor="notes">
            Notes:
          </label>
          <input
            className="mb2"
            id="notes"
            name="notes"
            onChange={handleChange}
            type="textarea"
            value={state.notes}
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
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
