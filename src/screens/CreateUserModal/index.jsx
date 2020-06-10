import React from 'react'
import {
  Form,
  Input,
  Checkbox,
  Button,
  Modal
} from 'antd';

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
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onFinish = e => {
    this.props.onFinish()
  }

  render() {
    return (
      <Modal
        title="Thêm user"
        visible={this.props.visible}
        onCancel={this.props.onFinish}
        footer={null}
      >
        <Form
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
            name="username"
            label="Tên tài khoản"
            rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!', whitespace: false }]}
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
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}