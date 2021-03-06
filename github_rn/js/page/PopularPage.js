import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  DeviceInfo
} from 'react-native'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'

import NavigationUtil from '../navigator/NavigationUtil'
import { actionPopular } from '../action'
import PopularItem from '../component/PopularItem'
import NavigationBar from '../component/NavigationBar'

const URL = `https://api.github.com/search/repositories?q=`
const QUERY_STR = `&sort=stars`
const THEME_COLOR = '#678'
const PAGE_SIZE = 10

// 最热页面
export default class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.tabNames = ['Java', 'Android', 'IOS', 'React', 'React Native', 'PHP']
  }
  // 生成顶部标签栏
  _genTabs = () => {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab-${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }

  render() {
    // 自定义组件NavigationBar的属性
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = (
      <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
      />
    )

    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false, //标签大写
          scrollEnabled: true, // 是否支持选项卡滚动，默认false
          style: {
            backgroundColor: '#678', // tabBar背景颜色
            height: 30 // fix 开启scrollEnable后在安卓上初次加载闪烁的问题
          }
        }
      })
    )
    return (
      <View
        style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}
      >
        {navigationBar}
        <TabNavigator />
      </View>
    )
  }
}

// 生成标签页面
class PopularTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
  }

  componentDidMount() {
    this.loadData()
  }

  // 获取与当前页面有关的数据
  _store() {
    const { popular } = this.props
    let store = popular[this.storeName] // 动态获取state

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
    const { onLoadPopularDataAsync, onLoadMorePopularAsync } = this.props

    const store = this._store()
    const url = this.getFetchUrl(this.storeName)

    // 是否是加载更多
    if (loadMore) {
      onLoadMorePopularAsync(
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
      onLoadPopularDataAsync(this.storeName, url, PAGE_SIZE)
    }
  }

  // 生成搜索地址
  getFetchUrl = key => URL + key + QUERY_STR

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
      <PopularItem
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
          keyExtractor={item => '' + item.id}
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
    popular: state.reducer_popular
  }
}

const mapDispatchToProps = dispatch => ({
  onLoadPopularDataAsync(storeName, url, pageSize) {
    dispatch(actionPopular.onLoadPopularDataAsync(storeName, url, pageSize))
  },
  onLoadMorePopularAsync(storeName, pageIndex, pageSize, dataArray, callBack) {
    dispatch(
      actionPopular.onLoadMorePopularAsync(
        storeName,
        pageIndex,
        pageSize,
        dataArray,
        callBack
      )
    )
  }
})

const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularTab)

// 样式表
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
