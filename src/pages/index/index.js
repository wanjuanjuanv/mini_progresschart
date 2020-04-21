import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ProgressChart from '../components/progressChart'

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    let newDatas = [{
        color: '#00B4FF',
        percent: 150,
        imageObj: require('../assets/image/ic_duration_work_white.png'),
        imageObjCard: require('../assets/image/ic_duration_work.png')
    },
    {
        color: '#EAD173',
        percent: 70,
        imageObj: require('../assets/image/ic_duration_overtime_white.png'),
        imageObjCard: require('../assets/image/ic_duration_overtime.png')
    },{
        color: '#63C9AE',
        percent: 0,
        imageObj: require('../assets/image/ic_duration_rest_white.png'),
        imageObjCard: require('../assets/image/ic_duration_rest.png')
    }];

    return (
      <View style={{display: 'flex',flexDirection:'column', 
        justifyContent: 'center', alignItems: 'center', paddingTop:'40px'}}>
        <ProgressChart
          data={newDatas}
          width={190}
          height={190}
          strokeWidth={23}
          innerWidth={4}
          shadowWidth={53}/>
      </View>

      
    )
  }
}
