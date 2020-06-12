import React from 'react'
import { Table, Space, Spin } from 'antd'

import UserService from 'services/user'

export default class User extends React.PureComponent {
  state = {}

  removeUser = async user => {
    console.log(user);
    try {
      if(window.confirm('Bạn chắc chắn muốn xóa user này?')) {
        const token = localStorage.getItem('token')
        await UserService.deleteUser(token, user.cardId)
        this.props.onRemoveUser(user)
      }
    } catch (error) {
      // handle error later
    }
  }

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
            <span>Xem activity</span>
            <span onClick={() => this.props.onEditUser(record)}>Sửa user</span>
            <span onClick={() => this.removeUser(record)}>Xóa user</span>
          </Space>
        )
      }
    ]

    return <Table dataSource={users} columns={columns} /> 
  }
}