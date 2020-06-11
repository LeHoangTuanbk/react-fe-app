import React from 'react'
import {
  Form,
  Input,
  Checkbox,
  Button,
  Modal
} from 'antd';

import UserService from 'services/user'
import { handleServerError } from 'utils/sever-error-handle-mapping'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default class CreateUserModal extends React.PureComponent {
  state = {
    loading: false
  }

  formRef = React.createRef();

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onFinish = async user => {
    if (this.state.loading) {
      return
    }
    this.setState({ loading: true })

    try {
      const token = localStorage.getItem('token')
      const data = await UserService.addNewUser(token, user)

      if (this.formRef && this.formRef.current) {
        this.formRef.current.resetFields()
      }

      this.props.addNewUserToList(data.body)

      this.props.onFinish()
    } catch (error) {
      const errorObj = handleServerError(error.response.body.code)
      if (this.formRef && this.formRef.current) {
        this.formRef.current.setFields([{
          name: errorObj.field,
          errors: [errorObj.message]
        }])
      }
    }

    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state

    return (
      <Modal
        title="Thêm user"
        visible={this.props.visible}
        onCancel={this.props.onFinish}
        footer={null}
      >
        <Form
          ref={this.formRef}
          {...formItemLayout}
          name="register"
          onFinish={this.onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="isAdmin"
            valuePropName="checked"
            {...tailFormItemLayout}
          >
            <Checkbox>
              Thêm user như một admin?
            </Checkbox>
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên người dùng"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!', whitespace: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="Tên tài khoản"
            rules={[
              { required: true, message: 'Vui lòng nhập tên tài khoản!', whitespace: false }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="cardId"
            label="Mã thẻ"
            rules={[{ required: true, message: 'Vui lòng thêm mã thẻ!', whitespace: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Vui lòng điền một đúng email!',
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}