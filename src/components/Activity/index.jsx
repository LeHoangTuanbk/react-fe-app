import React from 'react'
import { Space, Table } from 'antd'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment';

export default class Activity extends React.PureComponent {
  render() {
    const { activities } = this.props
    
    const columns = [
      {
        title: 'Card ID',
        dataIndex: 'cardId',
        key: 'cardId',
      },
      {
        title: 'Unlock Date',
        dataIndex: 'unclock_date',
        key: 'unclock_date',
        render: ((text, record) => <span>{formatDateTime(record.unclock_date)}</span>),
        sorter: (prevRecord, nextRecord) => moment(prevRecord.unclock_date).unix() - moment(nextRecord.unclock_date).unix()
      },
      {
        title: 'Tên đăng nhâp',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Unlock type',
        dataIndex: 'type',
        key: 'type',
      }
    ]

    return <Table dataSource={activities} columns={columns} />
  }
}