export default {
  required (value) {
    return value === 0 || !!value
  },
  minLength (value, par) {
    return (typeof value === 'string') && (value.length >= par)
  },
  maxLength (value, par) {
    return (typeof value === 'string') && (value.length <= par)
  }
}