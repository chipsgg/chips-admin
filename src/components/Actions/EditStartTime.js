import React, { useEffect, useState } from 'react'
import {
  Pane,
  Button,
  Tooltip,
  toaster,
  CornerDialog,
  RadioGroup,
  TextInputField,
} from 'evergreen-ui'

import Inputs from './inputs'

const EditConfirmation = ({ children, onConfirm }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [startTime, setStartTime] = useState(0)

  const handleConfirm = async () => {
    toaster.notify('Submitting Changes...')
    if (onConfirm) {
      await onConfirm(Date.now() + startTime * (1000 * 60))
        .then(resp => toaster.success('Success!'))
        .catch(err => toaster.danger(err.message))
    }
    setShowConfirmation(false)
  }

  return (
    <Pane>
      <CornerDialog
        title="Edit Confirmation"
        isShown={showConfirmation}
        onCloseComplete={() => setShowConfirmation(false)}
        confirmLabel="Confirm"
        cancelLabel="Oops, nevermind."
        intent="success"
        containerProps={{
          zIndex: 999,
        }}
        onConfirm={handleConfirm}
      >
        <Pane>
          <Inputs.StartTime value={startTime} onChange={setStartTime} />
        </Pane>
      </CornerDialog>

      <Tooltip content="Edit StartTime">
        <Button
          marginLeft={16}
          iconBefore="time"
          intent="none"
          onClick={() => setShowConfirmation(true)}
        >StartTime</Button>
      </Tooltip>
    </Pane>
  )
}

export default EditConfirmation
