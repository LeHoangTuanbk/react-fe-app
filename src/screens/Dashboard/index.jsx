import React from 'react'
import { Tabs, Modal, Button } from 'antd';

import UserService from 'services/user'
import ActivityService from 'services/activity'

import User from 'components/User';
import Activity from 'components/Activity';
import CreateUserModal from 'screens/CreateUserModal';
import SingleUserActivity from 'screens/SingleUserActivity';
import OpenDoorModal from 'screens/OpenDoorModal';

const { TabPane } = Tabs;

export default class Dashboard extends React.PureComponent {
  state = {
    loading: true,
    users: [],
    activities: [],
    showCreateUserModal: false,
    preUserEditable: null,
    showSingleActivityModal: false,
    activityUser: [],
    openDoorModal: false
  }

  showModal = visiable => {
    this.setState({
      showCreateUserModal: visiable,
    })
  }

  componentDidMount = async () => {
    this.setState({ loading: true })
    const token = localStorage.getItem('token')

    const data = await UserService.getAllUsers(token)
    const activityData = await ActivityService.getAllActivity()
    this.setState({ users: data.body, loading: false, activities: activityData.body })
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
    this.setState({ users: users.map(u => u.cardId === prevUser.cardId ? newUser : u) })
  }

  handleRemoveUser = user => {
    const { users } = this.state
    this.setState({ users: users.filter(u => u.cardId !== user.cardId) })
  }

  clearForm = () => {
    this.setState({ preUserEditable: null, showCreateUserModal: false })
  }

  showActivityUser = async cardId => {
    const activityData = await ActivityService.getUserActivity(cardId)
    this.setState({ showSingleActivityModal: true, activityUser: activityData.body })
  }

  setOpenDoor = openDoorModal => {
    this.setState({ openDoorModal })
  }

  render() {
    const { currentAdmin } = this.props
    const { users, loading, showCreateUserModal, preUserEditable, activities, showSingleActivityModal, activityUser, visiable, openDoorModal } = this.state

    var cardID = "13c6c61b";
    return (
      <div className="container">
        <div className="card-container">
          <Tabs type="card" tabPosition="left">
            <TabPane tab="Users" key="1">
              <Button type="primary" onClick={() => this.showModal(true)}>Thêm user</Button>
              {!loading && <User users={users} onEditUser={this.onEditUser} onRemoveUser={this.handleRemoveUser} currentAdmin={currentAdmin} setTargetActivityUser={this.showActivityUser} />}
            </TabPane>
            <TabPane tab="Nhật kí mở cửa" key="2">
              <Activity activities={activities.map(v => ({ ...v, cardId: v.User.cardId, username: v.User.username }))} />
            </TabPane>
            <TabPane tab="Mở khóa cửa nhà từ website" key="3" >
              <OpenDoorModal openDoorModal={openDoorModal} setOpenDoor={this.setOpenDoor} />
            </TabPane>
          </Tabs>
        </div>
        {
          showCreateUserModal &&
          <CreateUserModal visible={true} onFinish={() => this.showModal(false)} addNewUserToList={this.addNewUserToList} preUserEditable={preUserEditable} updateUser={this.updateUser} clearForm={this.clearForm} />
        }
        {
          <SingleUserActivity visiable={showSingleActivityModal} onFinish={() => this.setState({ showSingleActivityModal: false })} activities={activityUser.activities && activityUser.activities.map(v => ({ ...v, cardId: activityUser.cardId, username: activityUser.username }))} />
        }
      </div>
    )
  }
}
