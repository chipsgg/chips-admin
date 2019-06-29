import React, { useState, useEffect } from 'react'
import {
  Pane,
  Button,
  Tooltip,
  toaster,
  Dialog,
  TextInputField,
  TagInput,
  Text,
  Label,
  Spinner,
  Textarea,
} from 'evergreen-ui'

import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/theme/monokai'

import schema from '../../libs/matchSchema'

const Editor = ({ onConfirm, children, getFunc }) => {
  const [schema, setSchema] = useState({})
  const [match, setMatch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (!showConfirmation) return
    setLoading(true)

    if (getFunc) {
      getFunc()
        .then(schema => JSON.stringify(schema, null, 2))
        .then(schema => {
          setSchema(schema)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [showConfirmation])

  return (
    <Pane>
      <Dialog
        width={'75%'}
        height={'75vh'}
        title="Editor"
        isShown={showConfirmation}
        onCloseComplete={() => setShowConfirmation(false)}
        onConfirm={async () => {
          toaster.notify('Saving Changes...')
          if (onConfirm) {
            await onConfirm(match)
              .then(resp => toaster.success('Success!'))
              .catch(err => toaster.danger(err.message))
          }
          setShowConfirmation(false)
        }}
        confirmLabel="Save Changes"
        cancelLabel="Oops, nevermind."
        intent="success"
      >
        {loading ? (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={32}
          >
            <Spinner />
          </Pane>
        ) : (
          <Pane>
            {/* <Label htmlFor="textarea-object" marginBottom={4} display="block">
            Match Object
          </Label>
          <Textarea
            id="textarea-object"
            placeholder={JSON.stringify(match)}
            // onChange={e => setState({ value: e.target.value })}
            // value={state.value}
          /> */}

            <AceEditor
              fontSize={14}
              width={'100%'}
              name="editor"
              mode="json"
              theme="monokai"
              defaultValue={schema}
              value={match}
              onChange={match => setMatch(match)}
              editorProps={{ $blockScrolling: true }}
              tabSize={2}
            />
          </Pane>
        )}
      </Dialog>
      <Tooltip content="Open Editor">
        <Button
          iconBefore="annotation"
          marginLeft={16}
          onClick={() => {
            setShowConfirmation(true)
          }}
        >
          {children}
        </Button>
      </Tooltip>
    </Pane>
  )
}

export default Editor
