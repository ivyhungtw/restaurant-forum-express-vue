// Prevent admins from deleting restaurants accidentally
const checkDelete = () => {
  return window.confirm('Are you sure to delete it?')
}

module.exports = checkDelete
