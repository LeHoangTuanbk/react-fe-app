import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Button } from 'antd'

const OpenDoorModal = ({ openDoorModal, setOpenDoor }) => {
  return (
    <div>
      <Button type="primary" onClick={() => setOpenDoor(true)}>
        Mở khóa cửa nhà
      </Button>
      <Modal
        title="Cửa đã được mở"
        visible={openDoorModal}
        onOk={() => setOpenDoor(false)}
        onCancel={() => setOpenDoor(false)}
      >
        ...content
      </Modal>
    </div>
  )
}

export default OpenDoorModal
