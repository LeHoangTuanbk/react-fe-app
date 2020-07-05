import React from 'react'
import { Tabs, Button, Input } from 'antd';
import moment from 'moment';

import UserService from 'services/user'
import ActivityService from 'services/activity'
import openDoorService from 'services/openDoor'


import User from 'components/User';
import Activity from 'components/Activity';
import CreateUserModal from 'screens/CreateUserModal';
import SingleUserActivity from 'screens/SingleUserActivity';
import OpenDoorModal from 'screens/OpenDoorModal';
import user from 'services/user';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import DateRangePicker from 'components/DateRangePicker';


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
    openDoorModal: false,
    startDate: null,
    endDate: null,
    filteringActivities: [],
    filteringUsers: []
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
    this.setState({ users: data.body, filteringUsers: data.body, loading: false, activities: activityData.body, filteringActivities: activityData.body })
  }

  addNewUserToList = user => {
    const { users } = this.state
    this.updateGllobalUsers([user, ...users])
  }

  onEditUser = async (user) => {
    //const { users } = this.state
    //this.setState({ users: users.map(u => u.cardId === prevUser.cardId ? newUser : u) })

    // const token = localStorage.getItem('token')
    // const data = await UserService.getAllUsers(token)
    // const activityData = await ActivityService.getAllActivity()
    // this.setState({ users: data.body, activities: activityData.body })
    this.setState({ preUserEditable: user, showCreateUserModal: true })
    //this.setState({ loading: true })
  }

  updateUser = (prevUser, newUser) => {
    const { users } = this.state
    this.updateGllobalUsers(users.map(u => u.cardId === prevUser.cardId ? newUser : u))
  }

  handleRemoveUser = user => {
    const { users } = this.state
    this.updateGllobalUsers(users.filter(u => u.cardId !== user.cardId))
  }

  clearForm = () => {
    this.setState({ preUserEditable: null, showCreateUserModal: false })
  }

  updateGllobalUsers = users => {
    this.setState({ users, filteringUsers: users })
  }

  showActivityUser = async cardId => {
    const activityData = await ActivityService.getUserActivity(cardId)
    this.setState({ showSingleActivityModal: true, activityUser: activityData.body })
  }

  setOpenDoor = async openDoorModal => {
    if (openDoorModal) {
      const { currentAdmin } = this.props
      await openDoorService(currentAdmin.cardId);
    }

    this.setState({ openDoorModal })
  }

  handleChangeSearch = event => {
    const { value } = event.target
    const { users } = this.state

    if (!value) {
      this.setState({ filteringUsers: users })
    } else {
      this.setState({ filteringUsers: users.filter(u => (u.cardId.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (u.username.toLowerCase().indexOf(value.toLowerCase()) !== -1)) })
    }
  }

  handlePickDate = (start, end) => {
    const { activities, startDate, endDate } = this.state

    if (start)
      this.setState({ startDate: start })
    if (end)
      this.setState({ endDate: end })

    if ((startDate && end) || (start && endDate) || (startDate && endDate)) {
      this.setState({
        filteringActivities: activities.filter(a => {

          const sd = moment(start ? start : startDate).unix()
          const ad = moment(new Date(a.unclock_date).toDateString()).unix()
          const ed = moment(end ? end : endDate).unix()

          return ad >= sd && ad <= ed
        })
      })
    }
  }

  handleResetDateRange = () => {
    const { activities } = this.state

    this.setState({ startDate: null, endDate: null, filteringActivities: activities })
  }


  render() {
    const { currentAdmin } = this.props
    const { filteringUsers, loading, showCreateUserModal, preUserEditable, showSingleActivityModal, activityUser, openDoorModal, startDate, endDate, filteringActivities } = this.state

    return (
      <div className="container">
        <div className="card-container">
          <Tabs type="card" tabPosition="left">
            <TabPane tab="Users" key="1">
              <Button type="primary" onClick={() => this.showModal(true)}>Thêm user</Button>
              <Input onChange={this.handleChangeSearch} type="text" className="search" ref="search" placeholder="Tìm theo Card ID hoặc tên người dùng" style={{ width: 400, marginLeft: '2.8rem', marginRight: '0.2rem' }} />
              {!loading && <User users={filteringUsers} onEditUser={this.onEditUser} onRemoveUser={this.handleRemoveUser} currentAdmin={currentAdmin} setTargetActivityUser={this.showActivityUser} />}
            </TabPane>
            <TabPane tab="Nhật kí mở cửa" key="2">
              {/* <DateRangeChoose activities = {activities}/> */}
              <div>
                <DateRangePicker startDate={startDate} endDate={endDate} handlePickDate={this.handlePickDate} onResetDateRange={this.handleResetDateRange} />
              </div>


              <Activity activities={filteringActivities.map(v => ({ ...v, cardId: v.User.cardId, username: v.User.username }))} />
            </TabPane>
            <TabPane tab="Mở khóa cửa nhà từ website" key="3" >
              <OpenDoorModal openDoorModal={openDoorModal} setOpenDoor={this.setOpenDoor} />
            </TabPane>
          </Tabs>
        </div>
        {
          showCreateUserModal &&
          <CreateUserModal visible={true} currentAdmin={currentAdmin} onFinish={() => this.showModal(false)} addNewUserToList={this.addNewUserToList} preUserEditable={preUserEditable} updateUser={this.updateUser} clearForm={this.clearForm} />
        }
        {
          <SingleUserActivity visiable={showSingleActivityModal} onFinish={() => this.setState({ showSingleActivityModal: false })} activities={activityUser.activities && activityUser.activities.map(v => ({ ...v, cardId: activityUser.cardId, username: activityUser.username }))} />
        }
      </div>
    )
  }
}
