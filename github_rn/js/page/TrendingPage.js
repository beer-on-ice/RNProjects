import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  DeviceInfo,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import NavigationUtil from '../navigator/NavigationUtil'
import { actionTrending } from './../action'
import TrendingItem from '../component/TrendingItem'
import NavigationBar from '../component/NavigationBar'
import TrendingDialog, { TimeSpans } from './../component/TrendingDialog'

const EVENT_TYPE_TIME_SPAN_CHANGE = 'eventTypeTimeSpanChange'
const URL = `https://github.com/trending/`
const THEME_COLOR = '#678'
const PAGE_SIZE = 10

// 趋势页面
export default class TrendingPage extends Component {
  constructor(props) {
    super(props)
    this.tabNames = ['GAP', 'C', 'C#', 'PHP', 'JavaScript']
    this.state = {
      timeSpan: TimeSpans[0]
    }
  }
  // 生成顶部标签栏
  _genTabs = () => {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab-${index}`] = {
        screen: props => (
          <TrendingTabPage
            {...props}
            timeSpan={this.state.timeSpan}
            tabLabel={item}
          />
        ),
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }

  //  生成标题栏
  renderTitleView = () => {
    return (
      <View>
        <TouchableOpacity
          ref="button"
          underlayColor="transparent"
          onPress={() => this.dialog.show()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '400' }}>
              趋势 {this.state.timeSpan.showText}
            </Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{ color: '#fff' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  // 生成弹框
  renderTrendingDialog = () => {
    return (
      <TrendingDialog
        ref={dialog => (this.dialog = dialog)}
        onSelect={tab => this.onSelectTimeSpan(tab)}
      />
    )
  }

  // 选择时间
  onSelectTimeSpan = tab => {
    this.dialog.dismiss()
    this.setState({
      timeSpan: tab
    })
    // 监听时间的变化，触发下面内容的刷新
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
  }

  // 根据需要选择是否重新生成顶部导航TabNavigator
  _tabNav = () => {
    if (!this.tabNavigator) {
      this.tabNavigator = createAppContainer(
        createMaterialTopTabNavigator(this._genTabs(), {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false, //标签大写
            scrollEnabled: true, // 是否支持选项卡滚动，默认false
            style: {
              backgroundColor: '#678', // tabBar背景颜色
              height: 30
            }
          }
        })
      )
    }
    return this.tabNavigator
  }

  render() {
    // 自定义组件NavigationBar的属性
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = (
      <NavigationBar
        titleView={this.renderTitleView()}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
      />
    )
    const TabNavigator = this._tabNav()
    return (
      <View
        style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}
      >
        {navigationBar}
        <TabNavigator />
        {this.renderTrendingDialog()}
      </View>
    )
  }
}

// 生成标签页面
class TrendingTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel, timeSpan } = this.props
    this.storeName = tabLabel
    this.timeSpan = timeSpan
  }

  componentDidMount() {
    this.loadData()
    this.timespanChangeListener = DeviceEventEmitter.addListener(
      EVENT_TYPE_TIME_SPAN_CHANGE,
      timeSpan => {
        this.timeSpan = timeSpan
        this.loadData()
      }
    )
  }

  componentWillUnmount() {
    if (this.timespanChangeListener) {
      thi.timespanChangeListener.remove()
    }
  }

  // 获取与当前页面有关的数据
  _store() {
    const { trending } = this.props
    let store = trending[this.storeName] // 动态获取state

    if (!store) {
      store = {
        items: [],
        projectModes: [], //要显示的数据
        isLoading: false,
        hideLoadingMore: true //默认隐藏加载更多
      }
    }
    return store
  }

  // 加载数据
  loadData = loadMore => {
    const { onLoadTrendingDataAsync, onLoadMoreTrendingAsync } = this.props

    const store = this._store()
    const url = this.getFetchUrl(this.storeName)

    // 是否是加载更多
    if (loadMore) {
      onLoadMoreTrendingAsync(
        this.storeName,
        ++store.pageIndex,
        PAGE_SIZE,
        store.items,
        callBack => {
          this.refs.toast.show('没有更多了')
        }
      )
    } else {
      // 主要是刚进入时的加载，分出第一组要展示的数据
      onLoadTrendingDataAsync(this.storeName, url, PAGE_SIZE)
    }
  }

  // 生成搜索地址
  getFetchUrl = key => URL + key + '?' + this.timeSpan.searchText

  // 生成底部
  genIndicator = () => {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <Text>正在加载更多</Text>
        <ActivityIndicator style={styles.indicator} />
      </View>
    )
  }

  // 渲染列表内容
  renderItem = data => {
    const item = data.item
    return (
      <TrendingItem
        item={item}
        onSelect={() => {
          NavigationUtil.goPage(
            {
              projectModel: item
            },
            'DetailPage'
          )
        }}
      />
    )
  }

  render() {
    let store = this._store()

    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + (item.id || item.fullName)}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => {
                this.loadData()
              }}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            // 到底部就加载
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true)
                this.canLoadMore = false
              }
            }, 100)
          }}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true // fix 初始化时调用了reachend
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    trending: state.reducer_trending
  }
}

const mapDispatchToProps = dispatch => ({
  onLoadTrendingDataAsync(storeName, url, pageSize) {
    dispatch(actionTrending.onLoadTrendingDataAsync(storeName, url, pageSize))
  },
  onLoadMoreTrendingAsync(storeName, pageIndex, pageSize, dataArray, callBack) {
    dispatch(
      actionTrending.onLoadMoreTrendingAsync(
        storeName,
        pageIndex,
        pageSize,
        dataArray,
        callBack
      )
    )
  }
})

const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  tabStyle: {
    // minWidth: 50
    padding: 0
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
})
