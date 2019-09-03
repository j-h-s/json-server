import Api from '@/services/Api'

export default {
  test (input) {
    return Api().post('test', input)
  }
}
