import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom'

import AuthService from 'services/auth'
import Text from 'antd/lib/typography/Text';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Login extends React.PureComponent {
  state = {
    showError: false,
    loading: false
  }

  onFinish = async values => {
    this.setState({ showError: false, loading: true })
    
    const { username, password } = values
    try {
      const data = await AuthService.login({ username, password })

      const { token } = data.body

      localStorage.setItem('token', token)

      this.props.setIsAdmin()

      this.props.history.push('/dashboard')
    } catch (e) {
      this.setState({ showError: true })
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Tên tài khoản"
          name="username"
          rules={[{ required: true, message: 'Vui lòng điền tên đăng nhập' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng điền mật khẩu' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Lưu tài khoản</Checkbox>
        </Form.Item>

        {this.state.showError && 
          <Text type="danger" style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}>Tài khoản hoặc mật khẩu không chính xác</Text>
        }

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Đăng nhập 
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(Login)
