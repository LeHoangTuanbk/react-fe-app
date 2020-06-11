import React from 'react'
import { Tabs, Button } from 'antd';

import UserService from 'services/user'

import User from 'components/User';
import Activity from 'components/Activity';
import CreateUserModal from 'screens/CreateUserModal';

const { TabPane } = Tabs;

export default class Dashboard extends React.PureComponent {
  state = {
    loading: true,
    users: [],
    showCreateUserModal: false,
    preUserEditable: null,
  }

  showModal = visiable => {
    this.setState({
      showCreateUserModal: visiable,
    });
  };

  componentDidMount = async () => {
    this.setState({ loading: true })
    const token = localStorage.getItem('token')

    const data = await UserService.getAllUsers(token)
    this.setState({ users: data.body, loading: false })
  }

  addNewUserToList = user => {
    const { users } = this.state
    this.setState({ users: [user, ...users] })
  }

  onEditUser = user => {
    this.setState({ preUserEditable: user, showCreateUserModal: true })
  }

  updateUser = (prevUser, newUser) => {
    const { users } = this.state
    this.setState({ users: users.map(u => u.cardId === prevUser.cardId ? newUser : u )})
  }

  render() {
    const { currentAdmin } = this.props
    const { users, loading, showCreateUserModal, preUserEditable } = this.state

    return (
      <div className="container">
        <div className="navbar">
          <h1>Dashboard</h1>
          <p onClick={this.props.logout}>{currentAdmin.name}</p>
        </div>

        <div className="card-container">
          <Tabs type="card" tabPosition="left">
            <TabPane tab="Users" key="1">
              <Button type="primary" onClick={() => this.showModal(true)}>Thêm user</Button>
              {!loading && <User users={users} onEditUser={this.onEditUser} />}
            </TabPane>
            <TabPane tab="Activities" key="2">
              <Activity />
            </TabPane>
          </Tabs>
        </div>
        {
          showCreateUserModal && 
          <CreateUserModal visible={true} onFinish={() => this.showModal(false)} addNewUserToList={this.addNewUserToList} preUserEditable={preUserEditable} updateUser={this.updateUser} />
        }
      </div>
    )
  }
}
