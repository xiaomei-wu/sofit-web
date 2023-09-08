'use client';

import { useState } from 'react';
import styles from './Excercise.module.css';

export default function Exercise() {
  const [state, setState] = useState({
    startDate: new Date().toISOString().split('T')[0],
    startTime: new Date()
      .toLocaleTimeString('en-US', { hour12: false })
      .substring(0, 5),
    name: '',
    intensityLevel: 5,
    duration: '',
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
    const name = state.name;
    const errors = {};
    let formIsValid = true;

    if (!duration) {
      formIsValid = false;
      errors.duration = 'Duration cannot be empty';
    }
    if (!name) {
      formIsValid = false;
      errors.name = 'Name cannot be empty';
    }

    setState({ ...state, errors: errors });
    return formIsValid;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (handleValidation()) {
      const exerciseEntry = state;

      // Implement your logic for handling the form submission here
      // You can use axios or fetch API to make an HTTP request
      // to your API endpoint for saving exercise entries
    }
  };

  const handleDelete = event => {
    event.preventDefault();

    const exerciseToDeleteId = state.id;

    // Implement your logic for deleting exercise entries here
  };

  const handleEditing = event => {
    event.preventDefault();

    if (handleValidation()) {
      const updatedExercise = state;

      // Implement your logic for editing exercise entries here
    }
  };

  const nameOptions = [
    'Choose an option',
    'Aerobics',
    'Baseball',
    'Boxing',
    'Climbing',
    'Cycling',
    'Dancing',
    'Diving',
    'Football',
    'Golf',
    'Hiking',
    'Hockey',
    'Martial Arts',
    'Rowing',
    'Rugby',
    'Running',
    'Skiing',
    'Softball',
    'Swimming',
    'Tennis',
    'Volleyball',
    'Walking',
    'Weights',
    'Yoga',
    'Other',
  ];

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

          <label className="f6 mt3" htmlFor="name">
            Name:
          </label>
          <select
            className="f6 mt1"
            id="name"
            name="name"
            onChange={handleChange}
            value={state.name}
          >
            {nameOptions.map(option => {
              return (
                <option className="f6" key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <span style={{ color: 'red' }}>{state.errors.name}</span>

          <label className=" f6 mt3" htmlFor="intensityLevel">
            Intensity:
          </label>
          <input
            className="mt1 mb3"
            max="10"
            min="1"
            name="intensityLevel"
            onChange={handleChange}
            type="range"
            value={state.intensityLevel}
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
