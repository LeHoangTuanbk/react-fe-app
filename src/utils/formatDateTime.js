const formatDateTime = timestamp => {
  return `${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes()}:${new Date(timestamp).getSeconds()} ${new Date(timestamp).getDate()}-${new Date(timestamp).getMonth() + 1}-${new Date(timestamp).getFullYear()}`
}

export default formatDateTime
