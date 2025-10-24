
// src/components/organisms/group1/CollegeAabSection.js
import React from 'react';
import Background from '../../atoms/group1/Background';
import CollegeAab from '../../molecules/group1/CollegeAab';

export default function CollegeAabSection() {
  return (
    <Background
      image="/images/college.jpg"
      style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CollegeAab />
    </Background>
  );
}
