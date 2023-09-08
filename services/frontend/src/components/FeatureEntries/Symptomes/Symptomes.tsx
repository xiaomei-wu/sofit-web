'use client';

import { useState } from 'react';
import styles from './Symptomes.module.css';

const Symptomes = () => {
  const [symptome, setSymptome] = useState({
    startDate: new Date().toISOString().split('T')[0],
    startTime: new Date()
      .toLocaleTimeString('en-US', { hour12: false })
      .substring(0, 5),
    name: '',
    intensity: 5,
    notes: '',
    id: '',
    editing: '',
    errors: {},
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setSymptome({
      [name]: value,
    });
  };

  const handleValidation = () => {
    const name = symptome.name;
    const errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors.name = 'Name cannot be empty';
    }

    setSymptome({ ...symptome, errors: errors });
    return formIsValid;
  };

  const handleSubmit = event => {
    event?.preventDefault();

    if (handleValidation()) {
      const symptomEntry = symptome;

      // TODO CREATE
    }
  };

  const handleDelete = event => {
    event?.preventDefault();

    const symptomToDeleteId = symptome.id;
    // TODO: delete
  };

  const handleEditing = event => {
    event?.preventDefault();

    if (handleValidation()) {
      const updatedSymptom = symptome;
      // TODO: Update
      console.log(updatedSymptom);
    }
  };

  const nameOptions = [
    'Choose an option',
    'Nausea',
    'Vomiting',
    'Diarrhea',
    'Stomach pain',
    'Headache',
    'Bloating',
    'Eczema',
    'Hayfever',
    'Asthma',
    'Heartburn',
    'Gas',
    'Constipation',
    'Other',
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
        <form
          action="POST"
          className={styles.wrapper}
          onSubmit={symptome.editing ? handleEditing : handleSubmit}
        >
          <label className="f6 mt3 blue" htmlFor="start-date">
            Date:
          </label>
          <input
            id="start-date"
            name="startDate"
            onChange={handleChange}
            type="date"
            value={symptome.startDate}
          />

          <label className="f6 mt3" htmlFor="start-time">
            Time:
          </label>
          <input
            id="start-date"
            name="startTime"
            onChange={handleChange}
            type="time"
            value={symptome.startTime}
          />

          <label className="f6 mt3" htmlFor="name">
            Name:
          </label>
          <select
            id="name"
            name="name"
            onChange={handleChange}
            value={symptome.name}
          >
            {nameOptions.map(option => {
              return (
                <option className="f6" key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <span style={{ color: 'red' }}>{symptome.errors.name}</span>

          <label className=" f6 mt3" htmlFor="intensity">
            Intensity:
          </label>
          <input
            max="10"
            min="1"
            name="intensity"
            onChange={handleChange}
            type="range"
            value={symptome.intensity}
          />

          <label className="f6 mt3" htmlFor="notes">
            Notes:
          </label>
          <input
            id="notes"
            name="notes"
            onChange={handleChange}
            type="textarea"
            value={symptome.notes}
          />

          <button type="submit">Save</button>
        </form>

        <button onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
};

export default Symptomes;
