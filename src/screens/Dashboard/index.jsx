import React from 'react'
import { Tabs, Modal, Button } from 'antd';

import UserService from 'services/user'

import User from 'components/User';
import Activity from 'components/Activity';

const { TabPane } = Tabs;

export default class Dashboard extends React.PureComponent {
  state = {
    loading: true,
    users: [],
    visible: false,
    cardAvai: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      cardAvai: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount = async () => {
    this.setState({ loading: true })
    const token = localStorage.getItem('token')

    const data = await UserService.getAllUsers(token)
    this.setState({ users: data.body, loading: false })
  
  }



  render() {
    const { currentAdmin } = this.props
    const { users, loading } = this.state 
    var cardID = "13c6c61b";
    return (
      <div className="container">
        <div className="navbar">
          <p></p>
          <p onClick={this.props.logout} style={{ cursor: "pointer", color: "red" }}>Đăng xuất</p>
        </div>

        <div className="card-container">
          <Tabs type="card" tabPosition="left">
            <TabPane tab="Thông tin người dùng" key="1">
              {!loading && <User users={users} />}
            </TabPane>
            <TabPane tab="Nhật kí mở cửa" key="2">
              <Activity />
            </TabPane>
            <TabPane tab="Lấy mã thẻ" key="3" >
              <div onClick={() => {
                setTimeout(() => {
                  this.setState({
                    cardAvai : true
                  })
                }, 10000); 
            }}>
                <Button type="primary" onClick={this.showModal}>
                  Nhấn vào để lấy mã thẻ
                </Button>
                <Modal
                  title="Hãy ra cửa quẹt thẻ để có thể lấy được mã thẻ"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                > { this.state.cardAvai === true && 
                  <p>{cardID}</p>
                }

                </Modal>
              </div>
            </TabPane>
            <TabPane tab="Mở khóa cửa nhà từ website" key="4" >
              <div>
                <Button type="primary" onClick={this.showModal}>
                  Mở khóa cửa nhà
                </Button>
                <Modal
                  title="Cửa đã được mở"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                > { this.state.cardAvai === true && 
                  <p>{cardID}</p>
                }

                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
