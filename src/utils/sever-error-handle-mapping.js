const handleServerError = code => {
  switch (code) {
    case 'username-dub':
      return {
        field: 'username',
        message: 'Tên tài khoản đã tồn tại'
      }
  
    case 'email-dub':
      return {
        field: 'email',
        message: 'Email đã được sử dụng'
      }

    default:
      return null
  }
}

export { handleServerError }