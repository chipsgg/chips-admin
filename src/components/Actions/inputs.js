import React, { useState, useEffect } from 'react'
import {
  Pane,
  IconButton,
  Tooltip,
  toaster,
  CornerDialog,
  RadioGroup,
  TextInputField,
} from 'evergreen-ui'

const StartTime = ({ value = 0, onChange }) => {

  return (
    <TextInputField
      label="Start Time"
      description="How many MINUTES before the match begins?"
      value={value}
      onChange={e => {
        const time = parseInt(e.target.value) 
        onChange(time)
      }}
    />
  )
}

export default { StartTime }
