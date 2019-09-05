import Api from '@/services/Api'

export default {
  submit (input) {
    return Api().put('submit', input)
  }
}
