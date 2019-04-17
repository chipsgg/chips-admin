import React from "react";
import {
  Pane,
  Button,
  Tooltip,
  toaster,
  Dialog,
  TextInputField
} from "evergreen-ui";

class CreateProposition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showConfirmation: false,
      login: "",
      password: "",
      passwordConfirm: "",
      invalidPassword: false,
      validationMessage: "The provided passwords do not match!"
    };
  }

  isPasswordValid() {
    const { password, passwordConfirm } = this.state;
    const bool = password === passwordConfirm;
    this.setState({
      invalidPassword: bool
    });
    return bool;
  }

  render() {
    const { onConfirm } = this.props;
    const {
      showConfirmation,
      login,
      password,
      passwordConfirm,
      validationMessage,
      invalidPassword,
      loading
    } = this.state;

    return (
      <Pane>
        <Dialog
          title="Login / Register"
          isShown={showConfirmation}
          onCloseComplete={() => this.setState({ showConfirmation: false })}
          onConfirm={async () => {
            this.setState({ loading: true });
            toaster.notify("Authenticating...");
            if (onConfirm) {
              await onConfirm({ login, password })
                .then(resp => toaster.success("Authenticated!"))
                .catch(err => toaster.danger(err.message));
            }
            this.setState({ showConfirmation: false, loading: false });
          }}
          confirmLabel="Login/Register"
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
              onChange={e => this.setState({ login: e.target.value })}
            />
            <TextInputField
              type={"password"}
              disabled={loading}
              isInvalid={invalidPassword}
              validationMessage={invalidPassword ? validationMessage : null}
              required={true}
              label="Password"
              description="Please use a combination of special characters."
              placeholder="**********"
              value={password}
              onChange={e => {
                this.isPasswordValid();
                this.setState({ password: e.target.value });
              }}
            />
            <TextInputField
              type={"password"}
              disabled={loading}
              isInvalid={invalidPassword}
              validationMessage={invalidPassword ? validationMessage : null}
              required={true}
              label="Password Confirmation"
              description="Please confirm your password."
              placeholder="**********"
              value={passwordConfirm}
              onChange={e => {
                this.isPasswordValid();
                this.setState({ passwordConfirm: e.target.value });
              }}
            />
          </Pane>
        </Dialog>
        <Tooltip content="Login/Register">
          <Button
            isLoading={loading}
            appearance="primary"
            iconBefore="person"
            onClick={() => {
              this.setState({ showConfirmation: true });
            }}
          >
            Login/Register
          </Button>
        </Tooltip>
      </Pane>
    );
  }
}

export default CreateProposition;
