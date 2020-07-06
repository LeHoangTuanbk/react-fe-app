import React from 'react'
import { Table, Space } from 'antd'

import UserService from 'services/user'

export default class User extends React.PureComponent {
  state = {}

  removeUser = async user => {
    try {
      if(window.confirm('Bạn chắc chắn muốn xóa user này? Xóa user này cũng sẽ xóa mọi activity của họ.')) {
        const { currentAdmin } = this.props
        if (currentAdmin.cardId === user.cardId) {
          window.alert('Bạn không thể xóa chính bản thân bạn!')
          return;
        }
        await UserService.deleteUser(user.cardId)
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
            <span onClick={() => this.props.setTargetActivityUser(record.cardId)}>Xem activity</span>
            <span onClick={() => this.props.onEditUser(record)}>Sửa user</span>
            <span onClick={() => this.removeUser(record)}>Xóa user</span>
          </Space>
        )
      }
    ]

    return <Table dataSource={users} columns={columns} /> 
  }
}