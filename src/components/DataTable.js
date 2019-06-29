import React from 'react'
import { Table, Pane, Text, Badge } from 'evergreen-ui'
import lodash from 'lodash'
import moment from 'moment'

class MatchTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false,
    }
  }

  renderCellType = (key, data, type) => {
    switch (type) {
      case 'state':
        return (
          <Table.TextCell key={key}>
            <Badge>{data}</Badge>
          </Table.TextCell>
        )

      case 'opponents':
        return (
          <Table.TextCell key={key}>
            {data.reduce((memo, row, index) => {
              memo += index < 1 ? `${row.name} vs. ` : row.name
              return memo
            }, '')}
          </Table.TextCell>
        )
      case 'odds':
        return (
          <Table.TextCell key={key}>
            {data.map(odds => odds.odds).toString()}
          </Table.TextCell>
        )
      case 'array':
        return <Table.TextCell key={key}>{data.toString()}</Table.TextCell>
      case 'boolean':
        return (
          <Table.TextCell key={key}>{data ? 'TRUE' : 'FALSE'}</Table.TextCell>
        )
      case 'number':
        return (
          <Table.TextCell isNumber={true} key={key}>
            {data.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Table.TextCell>
        )
      case 'time':
        return (
          <Table.TextCell key={key}>{moment(data).fromNow()}</Table.TextCell>
        )
      default:
        return <Table.TextCell key={key}>{data}</Table.TextCell>
    }
  }

  render() {
    const { columns = [], rows = [], onSelect, actions, Edit } = this.props
    const { showConfirmation } = this.state
    return rows.length > 0 ? (
      <Table width={'100%'} height={'100%'}>
        <Table.Head>
          {columns.map(([key, value]) => {
            return <Table.TextHeaderCell key={key}>{key}</Table.TextHeaderCell>
          })}
          {Edit && (
            <Table.TextHeaderCell key={'Actions'}>Actions</Table.TextHeaderCell>
          )}
        </Table.Head>
        <Table.Body>
          {rows.map(row => (
            <Table.Row key={row.id}>
              {columns.map(([key, prop, type], index) => {
                const data = lodash.get(row, prop)
                key = index + key + data
                return this.renderCellType(key, data, type)
              })}

              {Edit && (
                <Table.Cell>
                  {Edit({
                    matchid: row.id,
                    actions,
                  })}
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    ) : (
      <Pane padding={32}>
        <Text>No Available Matches...</Text>
      </Pane>
    )
  }
}

export default MatchTable
