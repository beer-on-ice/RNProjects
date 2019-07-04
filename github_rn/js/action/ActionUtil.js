import ProjectModel from './../model/ProjectModel'
import Utils from './../util/Utils'
// 处理分组
export const handleData = (
  actionType,
  dispatch,
  storeName,
  data,
  pageSize,
  favoriteDao
) => {
  let fixItems = []

  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items
    }
  }
  let showItems =
    pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize) //第一次要加载的数据
  _projectModels(showItems, favoriteDao, projectModels => {
    dispatch({
      type: actionType,
      items: fixItems, // 原始数据
      projectModels: projectModels,
      storeName,
      pageIndex: 1
    })
  })
}

// 通过本地的收藏状态来包装item
export const _projectModels = async (showItems, favoriteDao, callback) => {
  let keys = []
  try {
    // 获取收藏的key
    keys = await favoriteDao.getFavoriteKeys()
  } catch (error) {
    console.log(error)
  }
  let projectModels = []
  for (let i = 0, len = showItems.length; i < len; i++) {
    projectModels.push(
      new ProjectModel(showItems[i], Utils.checkFavorite(showItem[i], keys))
    )
  }
  if (typeof callback === 'function') {
    callback(projectModels)
  }
}
