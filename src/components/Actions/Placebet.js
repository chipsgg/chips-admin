import React from 'react'
import {
  Pane,
  IconButton,
  Tooltip,
  toaster,
  CornerDialog,
  RadioGroup,
  TextInputField,
} from 'evergreen-ui'

class PlaceBet extends React.Component {
  constructor(props) {
    super(props)

    const selections = props.selections.map(item => {
      return { label: item, value: item }
    })

    this.state = {
      showConfirmation: false,
      selections,
      selection: selections[0].value,
      amount: 0,
    }
  }

  render() {
    const { showConfirmation, selections, selection, amount } = this.state
    const { onConfirm } = this.props

    return (
      <Pane>
        <CornerDialog
          title="Place Your Bet"
          isShown={showConfirmation}
          onCloseComplete={() => this.setState({ showConfirmation: false })}
          confirmLabel="Place Bet"
          cancelLabel="Oops, nevermind."
          intent="success"
          containerProps={{
            zIndex: 999,
          }}
          onConfirm={async () => {
            toaster.notify('Placing bet...')
            if (onConfirm) {
              await onConfirm({
                selection,
                amount,
              })
                .then(resp => toaster.success('Bet Placed!'))
                .catch(err => toaster.danger(err.message))
            }
            this.setState({ showConfirmation: false })
          }}
        >
          <Pane>
            <RadioGroup
              size={16}
              value={selection}
              options={selections}
              onChange={selection => this.setState({ selection })}
            />
            <TextInputField
              label="Bet Value"
              // description="Comma seperated list of available selections."
              placeholder="4,200"
              value={amount}
              onChange={e => {
                this.setState({ amount: Number(e.target.value) })
              }}
            />
          </Pane>
        </CornerDialog>

        <Tooltip content="Place Bet">
          <IconButton
            marginLeft={16}
            icon="form"
            intent="none"
            onClick={() => {
              this.setState({ showConfirmation: true })
            }}
          />
        </Tooltip>
      </Pane>
    )
  }
}

export default PlaceBet
