import React from 'react';
import Box from './Box'; 

const CourseList = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <Box className="w-60">COSI 10a - Problem Solving in Python</Box>
      <Box className="w-60">COSI 12b - Programming in Java</Box>
      <Box className="w-60">COSI 114a - Fundamentals of NLP I</Box>
      <Box className="w-60">COSI 115b - Fundamentals of NLP II</Box>
      <Box className="w-60">COSI 135b - Computational Semantics</Box>
      <Box className="w-60">COSI 132a - Information Retrieval</Box>
      <Box className="w-60">COSI 136a - Speech Recognition</Box>
      <Box className="w-60">COSI 231a - Advanced ML for NLP</Box>
      <Box className="w-60">COSI 232b - Information Extraction</Box>
      <Box className="w-60">COSI 216a - Topics in NLP</Box>
      <Box className="w-60">COSI 217b - NLP Systems</Box>
      <Box className="w-60">COSI 230b - NL Annotation for ML</Box>
    </div>
  );
};

export default CourseList;
