import React, { useState, useEffect } from 'react'

const TimeInput = ({ value = '00:00:00', setFunction }) => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const [initialHours, initialMinutes, initialSeconds] = (value || "00:00:00").split(':').map(Number)
    setHours(initialHours || 0)
    setMinutes(initialMinutes || 0)
    setSeconds(initialSeconds || 0)
  }, [value])

  const updateFormattedTime = (hrs, mins, secs) => {
    const formattedTime = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    setFunction(formattedTime)
  }

  const handleHoursChange = (e) => {
    const value = Math.max(0, Math.min(23, parseInt(e.target.value, 10) || 0))
    setHours(value)
    updateFormattedTime(value, minutes, seconds)
  }

  const handleMinutesChange = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0))
    setMinutes(value)
    updateFormattedTime(hours, value, seconds)
  }

  const handleSecondsChange = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0))
    setSeconds(value)
    updateFormattedTime(hours, minutes, value)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="number"
        value={hours}
        onChange={handleHoursChange}
        min="0"
        max="23"
        aria-label="Hours"
        className="bg-theme_gray font-medium px-1 py-1 border rounded-sm focus:outline-none focus:border-primary"
      />
      <span className='mx-3'>:</span>
      <input
        type="number"
        value={minutes}
        onChange={handleMinutesChange}
        min="0"
        max="59"
        aria-label="Minutes"
        className='bg-theme_gray font-medium px-1 py-1 border rounded-sm focus:outline-none focus:border-primary'
      />
      <span className='mx-3'>:</span>
      <input
        type="number"
        value={seconds}
        onChange={handleSecondsChange}
        min="0"
        max="59"
        aria-label="Seconds"
        className="bg-theme_gray font-medium px-1 py-1 border rounded-sm focus:outline-none focus:border-primary"
      />
    </div>
  )
}

export default TimeInput
