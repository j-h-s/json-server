import Api from '@/services/Api'

export default {
  list () {
    return Api().get('list')
  },

  open (filename) {
    return Api().get('file/' + filename)
  }
}
