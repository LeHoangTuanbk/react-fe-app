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

  render() {
    const { currentAdmin } = this.props
    const { users, loading, showCreateUserModal} = this.state

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
              {!loading && <User users={users} />}
            </TabPane>
            <TabPane tab="Activities" key="2">
              <Activity />
            </TabPane>
          </Tabs>
        </div>
        <CreateUserModal visible={showCreateUserModal} onFinish={() => this.showModal(false)} addNewUserToList={this.addNewUserToList} />
      </div>
    )
  }
}
