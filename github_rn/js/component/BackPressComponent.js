import { BackHandler } from 'react-native'

export default class BackPressComponent {
  constructor(props) {
    this._hardWareBackPress = this.onHardwareBackPress.bind(this)
    this.props = props
  }
  componentDidMount() {
    if (this.props.backPress)
      BackHandler.addEventListener('hardwareBackPress', this._hardWareBackPress)
  }
  componentWillUnmount() {
    if (this.props.backPress)
      BackHandler.removeEventListener('hardwareBackPress')
  }
  onHardwareBackPress(e) {
    return this.props.backPress(e)
  }
}
