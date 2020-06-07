import React from 'react'
import { Tabs } from 'antd';

import UserService from 'services/user'

import User from 'components/User';
import Activity from 'components/Activity';

const { TabPane } = Tabs;

export default class Dashboard extends React.PureComponent {
  state = {
    loading: true,
    users: []
  }

  componentDidMount = async () => {
    this.setState({ loading: true })
    const token = localStorage.getItem('token')

    const data = await UserService.getAllUsers(token)
    this.setState({ users: data.body, loading: false })
  }

  render() {
    const { currentAdmin } = this.props
    const { users, loading } = this.state

    return (
      <div className="container">
        <div className="navbar">
          <h1>Dashboard</h1>
          <p onClick={this.props.logout}>{currentAdmin.name}</p>
        </div>

        <div className="card-container">
          <Tabs type="card" tabPosition="left">
            <TabPane tab="Users" key="1">
              {!loading && <User users={users} />}
            </TabPane>
            <TabPane tab="Activities" key="2">
              <Activity />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
