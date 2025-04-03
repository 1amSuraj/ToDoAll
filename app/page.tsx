'use client'
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div>
      
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
  );
}