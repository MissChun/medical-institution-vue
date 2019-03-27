import {deepcopy} from '../../assets/js/arrobj'
/* store getters */
export default {
  getIncludeAllSelect: state => {
    let allSelect = {
      verbose: '全部',
      key: ''
    }
    let selectData = deepcopy(state.selectData)
    // Object.assign(selectData, state.selectData);
    for (let i in selectData) {
      selectData[i].unshift(allSelect)
    }
    return selectData
  }

}
