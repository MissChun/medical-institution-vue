<template>
  <div>
    <div class="nav-tab">
      <div class="tab-screen border-top">
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-input
                placeholder="请输入"
                v-model="searchFilters.keyword"
                @keyup.native.13="startSearch"
                class="search-filters-screen"
              >
                <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                  <el-option
                    v-for="(item,key) in selectData.fieldSelect"
                    :key="key"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="健康管理阶段:" label-width="100px">
                <el-select v-model="searchFilters.operation" placeholder="请选择">
                  <el-option
                    v-for="(item,key) in selectData.stageSelect"
                    :key="key"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单状态:">
                <el-select v-model="searchFilters.complete_status" placeholder="请选择">
                  <el-option
                    v-for="(item,key) in selectData.orderStatusSelect"
                    :key="key"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="订单生成时间:" label-width="110px">
                <el-date-picker
                  v-model="generationTime"
                  type="datetimerange"
                  @change="startSearch"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn text-right">
        <!-- <el-button type="primary" plain>导入</el-button> -->
        <!-- <el-button type="primary">导出</el-button> -->
        <el-button type="success" @click="goAddLink('add')">新增</el-button>
      </div>
      <div class="table-list">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          size="mini"
          v-loading="pageLoading"
          :class="{'tabal-height-500':!tableData.length}"
        >
          <el-table-column
            v-for="(item,key) in thTableList"
            :key="key"
            :prop="item.param"
            align="center"
            :label="item.title"
          >
            <!-- :width="item.width?item.width:140" -->
            <template slot-scope="scope">
              <div
                class="cursor-pointer text-blue"
                v-if="item.param==='service_package'"
                :title="scope.row.service_package.package_description"
                @click="goAddLink('package',scope.row)"
              >{{scope.row.service_package.package_name}}</div>
              <div
                v-else-if="item.param==='order_number'"
                @click="goAddLink('detail',scope.row)"
                class="cursor-pointer text-blue"
              >{{scope.row[item.param]}}</div>
              <div v-else-if="item.param==='source'">
                {{scope.row[item.param]}}
                <span v-if="scope.row[item.param]">端</span>
              </div>
              <div v-else-if="item.param_two">{{scope.row[item.param][item.param_two]}}</div>
              <div v-else>{{scope.row[item.param]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="220" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                v-if="scope.row.status==='in_service'"
                @click="changePhase(scope.row)"
              >更改管理阶段</el-button>
              <el-button
                :type="item.statusNew==='canceled'?'danger': 'success'"
                size="mini"
                :plain="(item.statusNew==='canceled'?true:false)|| (index/2?true:false)"
                v-for="(item,index) in statusBtn(scope.row.status,scope.row.source)"
                @click="switchingState(scope.row)"
                :key="index"
              >{{item.statusNew==='canceled'?'':'置为'}}{{item.value}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <noData v-if="!pageLoading && tableData.length==0"></noData>
      </div>
      <div class="page-list text-center">
        <el-pagination
          background
          layout="prev, pager, next,jumper"
          :total="pageData.totalCount"
          :page-size="pageData.pageSize"
          :current-page.sync="pageData.currentPage"
          @current-change="pageChange"
          v-if="!pageLoading && pageData.totalCount>10"
        ></el-pagination>
      </div>
    </div>
    <change-phase-dialog
      :dialog-type="dialogTypeIsShow"
      :row="changePhaseRow"
      v-on:closeDialogBtn="closeDialog"
    ></change-phase-dialog>
  </div>
</template>
<script>
import changePhaseDialog from '@/components/orderManage/changePhaseDialog'
export default {
  name: 'healthOrderList',
  components: {
    changePhaseDialog: changePhaseDialog
  },
  computed: {
    enterpriseId() {
      let users = this.pbFunc.getLocalData('users', true)
      return users.enterprise._id
    }
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10
      },
      generationTime: [], // 订单生成时间
      searchPostData: {}, // 搜索参数
      searchFilters: {
        state: '',
        status: '',
        keyword: '',
        field: 'order_number'
      },
      changePhaseRow: {}, // 更改阶段的信息
      dialogTypeIsShow: false, // 更改健康管理阶段
      selectData: {
        orderStatusSelect: [{ id: '', value: '全部' }],
        stageSelect: [
          { id: '', value: '全部' },
          { id: 'contact', value: '电话随访' },
          { id: 'interpretation', value: '解读报告' },
          { id: 'questionnaire', value: '发放问卷' }
        ],
        fieldSelect: [
          { id: 'order_number', value: '健康管理订单号' },
          { id: 'profile.nick_name', value: '健康管理用户姓名' },
          { id: 'source', value: '订单来源' }
        ]
      },
      thTableList: [
        {
          title: '健康管理订单号',
          param: 'order_number',
          width: ''
        },
        {
          title: '健康管理用户姓名',
          param: 'profile',
          param_two: 'nick_name',
          width: ''
        },
        {
          title: '健康管理服务套餐',
          param: 'service_package',
          param_two: 'package_name',
          width: ''
        },
        {
          title: '健康管理阶段',
          param: 'state_list_str',
          width: ''
        },
        {
          title: '健康管理订单来源',
          param: 'source',
          width: ''
        },
        {
          title: '订单生成时间',
          param: 'created_at',
          width: '180'
        },
        {
          title: '订单状态',
          param: 'status_name',
          width: ''
        }
      ],
      tableData: []
    }
  },
  methods: {
    closeDialog: function(type, isSave) {
      this.dialogTypeIsShow = false
      if (isSave) {
        this.getList()
      }
    },
    // 更改阶段
    changePhase(row) {
      this.changePhaseRow = row
      this.dialogTypeIsShow = true
    },
    // 切换状态
    switchingState(row, type) {
      let msg = ''
      let status = row.status
      let statusNew = ''
      if (status === 'obligation') {
        if (type === 'canceled') {
          msg = '请确认要取消订单，取消操作不可撤回，请确保已退款给用户!'
          statusNew = 'canceled'
        } else {
          msg = '请确认已收到款项，操作后订单将置为【待服务】的状态!'
          statusNew = 'waiting'
        }
      } else if (status === 'waiting') {
        if (type === 'obligation') {
          msg = '请确认已退回款项，操作后订单将置为【待付款】的状态!'
          statusNew = 'obligation'
        } else {
          msg = '操作后订单将置为【服务中】的状态!'
          statusNew = 'in_service'
        }
      } else if (status === 'in_service') {
        if (type === 'finished') {
          msg = '请确认已结算完成，操作后订单将置为【已完成】的状态!'
          statusNew = 'finished'
        } else if (type === 'waiting') {
          msg = '操作后订单将置为【待服务】的状态!'
          statusNew = 'waiting'
        } else {
          msg = '操作后订单将置为【待结算】的状态!'
          statusNew = 'settlement'
        }
      } else if (status === 'settlement') {
        if (type === 'finished') {
          msg = '请确认已结算完成，操作后订单将置为【已完成】的状态!'
          statusNew = 'finished'
        } else if (type === 'waiting') {
          msg = '操作后订单将置为【服务中】的状态!'
          statusNew = 'waiting'
        }
      } else if (status === 'finished') {
        msg = '操作后订单将置为【待结算】的状态!'
        statusNew = 'settlement'
      }
      this.$msgbox({
        title: '订单状态更改',
        message: msg,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '提交中...'
            let postData = {
              order: row._id,
              status: statusNew
            }
            this.$$http('updateOrderStatus', postData)
              .then(results => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '确定'
                if (results.data && results.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  this.getList()
                  done()
                } else {
                  done()
                }
              })
              // eslint-disable-next-line
              .catch(err => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '确定'
                this.$message.error('操作失败')
              })
          } else {
            done()
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          }
        }
      }).then(() => {})
    },
    // 状态按钮
    statusBtn(status, source) {
      let btnList = []
      if (status === 'obligation') {
        if (source === 'C') {
          btnList = [
            {
              status: 'obligation',
              statusNew: 'canceled',
              value: '取消订单'
            },
            {
              status: 'obligation',
              statusNew: 'waiting',
              value: '待服务'
            }
          ]
        } else {
          btnList = [
            {
              status: 'obligation',
              statusNew: 'waiting',
              value: '待服务'
            }
          ]
        }
      } else if (status === 'waiting') {
        btnList = [
          {
            status: 'waiting',
            statusNew: 'in_service',
            value: '服务中'
          },
          {
            status: 'waiting',
            statusNew: 'obligation',
            value: '待付款'
          }
        ]
      } else if (status === 'in_service') {
        if (source === 'U' || source === 'C') {
          btnList = [
            {
              status: 'in_service',
              statusNew: 'finished',
              value: '已完成'
            },
            {
              status: 'in_service',
              statusNew: 'waiting',
              value: '待服务'
            }
          ]
        } else {
          btnList = [
            {
              status: 'in_service',
              statusNew: 'settlement',
              value: '待结算'
            },
            {
              status: 'in_service',
              statusNew: 'waiting',
              value: '待服务'
            }
          ]
        }
      } else if (status === 'settlement') {
        btnList = [
          {
            status: 'settlement',
            statusNew: 'finished',
            value: '已完成'
          },
          {
            status: 'settlement',
            statusNew: 'in_service',
            value: '服务中'
          }
        ]
      } else if (status === 'finished') {
        btnList = [
          {
            status: 'finished',
            statusNew: 'settlement',
            value: '待结算'
          }
        ]
      }
      return btnList
    },
    goAddLink(type, row) {
      if (type === 'add') {
        window.open(`/#/orderManage/healthOrder/healthOrderEdit`, '_blank')
      } else if (type === 'package') {
        window.open(
          `/#/servicePackageManage/healthServicePackage/servicePackDetail/` +
            row.service_package._id,
          '_blank'
        )
      } else if (type === 'detail') {
        window.open(
          `/#/orderManage/healthOrder/healthOrderDetail/` + row._id,
          '_blank'
        )
      }
    },
    pageChange() {
      setTimeout(() => {
        this.getList()
      })
    },
    // 搜索
    startSearch() {
      this.pageData.currentPage = 1
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters)
      this.getList()
    },
    // 获取订单状态列表
    getOrderStatusList() {
      let postData = {}
      this.$$http('orderStatusList', postData)
        .then(results => {
          if (results.data && results.data.code === 0) {
            let data = results.data.content
            let list = []
            data.forEach(item => {
              if (item.flow_key === 'service-order') {
                list = item.status_list
              }
            })
            list.forEach(item => {
              this.selectData.orderStatusSelect.push({
                id: item.status_key,
                value: item.status_name
              })
            })
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.$message({
            message: '获取订单状态列表失败',
            type: 'error'
          })
        })
    },
    // 列表
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        enterprise: this.enterpriseId,
        client_type: 'B',
        order_type: 'service-order',
        status: this.searchPostData.status,
        state: this.searchPostData.state
      }
      postData.search_type = this.searchPostData.field
      postData.search = this.searchPostData.keyword
      if (this.generationTime.length) {
        postData.created_at_start = this.generationTime[0]
        postData.created_at_end = this.generationTime[1]
      }
      postData = this.pbFunc.fifterObjIsNull(postData)
      this.$$http('physicalOrderList', postData)
        .then(results => {
          if (results.data && results.data.code === 0) {
            this.tableData = results.data.content.instances
            this.tableData.forEach(item => {
              item.state_list_str = ''
              item.state_list.forEach(stage => {
                if (stage.operation_status) {
                  item.state_list_str += stage.operation_name + ','
                }
              })
            })
            this.pageData.totalCount = results.data.content.count
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.$message({
            message: '获取列表失败',
            type: 'error'
          })
        })
    }
  },
  created() {
    this.getList()
    this.getOrderStatusList()
  }
}
</script>
<style>
</style>
