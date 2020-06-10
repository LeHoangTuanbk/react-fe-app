import React from 'react'
import { Table, Space } from 'antd'

export default class User extends React.PureComponent {
  state = {}

  render() {
    const { users } = this.props

    const columns = [
      {
        title: 'Card ID',
        dataIndex: 'cardId',
        key: 'cardId',
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Tên đăng nhâp',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a href="#">Xem activity</a>
            <a href="#">Xóa user</a>
          </Space>
        )
      }
    ]

    return <Table dataSource={users} columns={columns} /> 
  }
}