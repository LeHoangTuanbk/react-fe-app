import React from 'react'
import Modal from 'antd/lib/modal/Modal'

import Activity from 'components/Activity'

export default class SingleUserActivity extends React.PureComponent {
  state = {}

  render() {
    const { visiable, onFinish, activities } = this.props

    console.log(visiable);

    return (
      <Modal
        title={activities && activities[0].username}
        visible={visiable}
        onCancel={onFinish}
        footer={null}
      >
        <Activity activities={activities} />
      </Modal>
    )
  }
}