import React, { useState, useEffect } from 'react'
import {
  Pane,
  Button,
  Tooltip,
  toaster,
  Dialog,
  TextInputField,
} from 'evergreen-ui'

const Login = ({ onConfirm }) => {
  const [state, setNewState] = useState({
    loading: false,
    showConfirmation: false,
    login: '',
    password: '',
  })

  const setState = newState => {
    return setNewState({
      ...state,
      ...newState,
    })
  }

  const submitRequest = async () => {
    setState({ loading: true })
    toaster.notify('Authenticating...')
    if (onConfirm) {
      await onConfirm({ login, password })
        .then(resp => toaster.success('Authenticated!'))
        .catch(err => toaster.danger(err.message))
    }
    setState({ showConfirmation: false, loading: false })
  }

  const { showConfirmation, login, password, loading } = state

  return (
    <Pane>
      <Dialog
        title="Login"
        isShown={showConfirmation}
        onCloseComplete={() => setState({ showConfirmation: false })}
        onConfirm={submitRequest}
        confirmLabel="Login"
        intent="success"
        isConfirmLoading={loading}
      >
        <Pane>
          <TextInputField
            disabled={loading}
            required={true}
            label="Username"
            placeholder="tacyarg"
            value={login}
            onChange={e => setState({ login: e.target.value })}
          />
          <TextInputField
            type={'password'}
            disabled={loading}
            required={true}
            label="Password"
            placeholder="**********"
            value={password}
            onChange={e => {
              setState({ password: e.target.value })
            }}
          />
        </Pane>
      </Dialog>
      <Tooltip content="Submit Login">
        <Button
          isLoading={loading}
          appearance="primary"
          iconBefore="person"
          onClick={() => {
            setState({ showConfirmation: true })
          }}
        >
          Login
        </Button>
      </Tooltip>
    </Pane>
  )
}

const Register = ({ onConfirm }) => {
  const [state, setNewState] = useState({
    loading: false,
    showConfirmation: false,
    login: '',
    password: '',
    passwordConfirm: '',
    invalidPassword: false,
    validationMessage: 'The provided passwords do not match!',
  })

  const setState = newState => {
    return setNewState({
      ...state,
      ...newState,
    })
  }

  const isPasswordValid = () => {
    const { password, passwordConfirm } = state
    const bool = password === passwordConfirm
    setState({
      invalidPassword: bool,
    })
    return bool
  }

  const submitRequest = async () => {
    setState({ loading: true })
    toaster.notify('Authenticating...')
    if (onConfirm) {
      await onConfirm({ login, password })
        .then(resp => toaster.success('Authenticated!'))
        .catch(err => toaster.danger(err.message))
    }
    setState({ showConfirmation: false, loading: false })
  }

  const {
    showConfirmation,
    login,
    password,
    passwordConfirm,
    validationMessage,
    invalidPassword,
    loading,
  } = state

  return (
    <Pane>
      <Dialog
        title="Register"
        isShown={showConfirmation}
        onCloseComplete={() => setState({ showConfirmation: false })}
        onConfirm={submitRequest}
        confirmLabel="Register"
        intent="success"
        isConfirmLoading={loading}
      >
        <Pane>
          <TextInputField
            disabled={loading}
            required={true}
            label="Username"
            description="Your unique username."
            placeholder="tacyarg"
            value={login}
            onChange={e => setState({ login: e.target.value })}
          />
          <TextInputField
            type={'password'}
            disabled={loading}
            isInvalid={invalidPassword}
            validationMessage={invalidPassword ? validationMessage : null}
            required={true}
            label="Password"
            description="Please use a combination of special characters."
            placeholder="**********"
            value={password}
            onChange={e => {
              isPasswordValid()
              setState({ password: e.target.value })
            }}
          />
          <TextInputField
            type={'password'}
            disabled={loading}
            isInvalid={invalidPassword}
            validationMessage={invalidPassword ? validationMessage : null}
            required={true}
            label="Password Confirmation"
            description="Please confirm your password."
            placeholder="**********"
            value={passwordConfirm}
            onChange={e => {
              isPasswordValid()
              setState({ passwordConfirm: e.target.value })
            }}
          />
        </Pane>
      </Dialog>
      <Tooltip content="Submit Register">
        <Button
          isLoading={loading}
          appearance="primary"
          iconBefore="person"
          onClick={() => {
            setState({ showConfirmation: true })
          }}
        >
          Register
        </Button>
      </Tooltip>
    </Pane>
  )
}

const Logout = ({onClick}) => {
  return (
    <Button
      marginLeft={16}
      // marginRight={16}
      // isLoading={loading}
      intent="danger"
      iconBefore="log-out"
      onClick={onClick}
    >
      Logout
    </Button>
  )
}

export default {
  Login,
  Register,
  Logout
}
