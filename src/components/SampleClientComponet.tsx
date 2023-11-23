'use client';

import { useState } from 'react';
import { useEffect } from 'react';
export default function SampleClientComponent() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

//   useEffect(() =>
//   alert("Component rendered!")
//     );
//   useEffect(() =>
//   alert("Component rendered!")
//   , []);
//   useEffect(() =>
//   alert("Component rendered!")
// , [leftCount]);

  // function handleLeftClick() {
  //   setLeftCount((count) => count + 1);
  // }

  // function handleRightClick() {
  //   setRightCount((count) => count + 1);
  // }

  return (
    <div>
      <p>
        You clicked {leftCount} and {rightCount} times
      </p>
      <button
        className='rounded-md bg-gray-800 px-4 py-2 text-center text-gray-100 hover:bg-gray-700 hover:text-gray-50'
        onClick={handleLeftClick}
      >
        Left button
      </button>
      <button
        className='rounded-md bg-gray-800 px-4 py-2 text-center text-gray-100 hover:bg-gray-700 hover:text-gray-50'
        onClick={handleRightClick}
      >
        Right button
      </button>
    </div>
  );
}