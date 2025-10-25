// src/components/molecules/CollegeAab.js
import React from 'react';
import Button from '../../atoms/group1/Button';

export default function CollegeAab() {
  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h1>College AAB</h1>
      <p>This is a description of College AAB.</p>
      <Button text="Learn More" onClick={() => alert('Clicked!')}  />
    </div>
  );
}
