import React, { useState } from 'react'

function Facts() {
  const [test, setTest] = useState(true)
  return (
    <div>Facts
    <button onClick={() => setTest(false)}>Test</button>
    <p>{test}</p>
    </div>
  )
}

export default Facts