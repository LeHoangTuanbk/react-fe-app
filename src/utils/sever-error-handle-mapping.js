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

    case 'card-dub':
      return {
        field: 'cardId',
        message: 'Card Id đã được sử dụng'
      }

    case 'Users.PRIMARY-not_unique':
      return {
        field: 'cardId',
        message: 'Card Id đã được sử dụng'
      }
    
    case 'Users.username-not_unique':
      return {
        field: 'username',
        message: 'Tên tài khoản đã tồn tại'
      }

    case 'Users.email-not_unique':
      return {
        field: 'email',
        message: 'Email đã được sử dụng'
      }

    case 'sever-error':
      return null

    default:
      return null
  }
}

export { handleServerError }