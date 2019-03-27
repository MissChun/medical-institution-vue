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
            <el-col :span="8">
              <el-form-item label="有效时间:">
                <el-date-picker
                  v-model="activeTime"
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
            <el-col :span="6">
              <el-form-item label="服务包类型:" label-width="100px">
                <el-select
                  v-model="searchFilters.package_type"
                  placeholder="请选择"
                  @change="startSearch"
                >
                  <el-option
                    v-for="(item) in selectData.servicePackTypeSelect"
                    :key="item._id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn text-right">
        <!-- <el-button type="primary" plain>导入</el-button> -->
        <!-- <el-button type="primary">导出</el-button> -->
        <el-button type="success" @click="newPage('add')">新增</el-button>
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
            :width="item.width"
          >
            <template slot-scope="scope">
              <div
                v-if="item.param === 'service_agencies'&&scope.row[item.param]"
              >{{scope.row[item.param].enterprise_name}}</div>
              <div v-else-if="item.param === 'package_type'">{{scope.row.package_type.type_name}}</div>
              <div v-else>{{scope.row[item.param]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="有效时间" align="center" width="350" fixed="right">
            <template slot-scope="scope">
              <div>{{scope.row.effect_time_start}} - {{scope.row.effect_time_end}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="newPage('detail',scope.row)">查看</el-button>
              <el-button type="danger" size="mini" plain @click="newPage('delete',scope.row)">删除</el-button>
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
    <add-service-pack-dialog
      :is-show="addServicePackIsShow"
      :service-pack-type="servicePackTypeList"
      v-on:closeDialogBtn="closeDialog"
    ></add-service-pack-dialog>
  </div>
</template>
<script>
import addServicePackDialog from '@/components/servicePackageManage/addServicePackDialog'
export default {
  name: 'partnerList',
  computed: {
    enterpriseId() {
      let users = this.pbFunc.getLocalData('users', true)
      return users.enterprise._id
    }
  },
  components: {
    addServicePackDialog: addServicePackDialog
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10
      },
      activeTime: [], // 有效时间
      searchPostData: {}, // 搜索参数
      searchFilters: {
        package_type: '',
        keyword: '',
        field: 'package_name'
      },
      servicePackTypeList: [], // 服务包类型
      selectData: {
        servicePackTypeSelect: [{ id: '', value: '全部' }],
        fieldSelect: [
          { id: 'package_name', value: '服务包名称' },
          { id: 'service_agencies.enterprise_name', value: '服务包合作方' }
        ]
      },
      thTableList: [
        {
          title: '服务包名称',
          param: 'package_name',
          width: ''
        },
        {
          title: '服务包类型',
          param: 'package_type',
          width: ''
        },
        {
          title: '服务包价格',
          param: 'package_price',
          width: ''
        },
        {
          title: '服务包合作方',
          param: 'service_agencies',
          width: ''
        }
      ],
      tableData: [],
      addServicePackIsShow: false // 新增服务包窗口
    }
  },
  methods: {
    closeDialog: function(type, isSave) {
      this.addServicePackIsShow = false
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
    newPage(type, row) {
      if (type === 'add') {
        this.addServicePackIsShow = true
      } else if (type === 'detail') {
        window.open(
          `/#/servicePackageManage/healthServicePackage/servicePackDetail/${
            row._id
          }/`,
          '_blank'
        )
      } else if (type === 'delete') {
        this.deleteServicePack(row)
      }
    },
    // 删除服务包
    deleteServicePack(row) {
      this.$msgbox({
        title: '删除服务包',
        message: '删除提示内容',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '提交中...'
            this.$$http('deleteServicePack', { id: row._id }).then(results => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
              if (results.data && results.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.startSearch()
                done()
              } else {
                done()
                let setMeal = ''
                results.data.data.forEach((item, index) => {
                  setMeal += item.enterprise_name + '、'
                })
                this.$alert(
                  '判断提示' + '<div>' + setMeal + '</div>',
                  '删除服务包',
                  {
                    confirmButtonText: '确定',
                    dangerouslyUseHTMLString: true
                  }
                )
              }
            })
          } else {
            done()
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      }).then(() => {})
    },
    // 服务包类型筛选列表
    getServicePackTypeList() {
      this.$$http('servicePackTypeList', {}).then(results => {
        if (results.data && results.data.code === 0) {
          this.servicePackTypeList = results.data.content
          results.data.content.forEach((item, index) => {
            this.selectData.servicePackTypeSelect.push({
              _id: item._id,
              id: item.type_key,
              value: item.type_name
            })
          })
        }
      })
    },
    // 列表
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        enterprise: this.enterpriseId
      }
      postData.search_type = this.searchPostData.field
      postData.search = this.searchPostData.keyword
      if (this.searchPostData.package_type) {
        postData.package_type = this.searchPostData.package_type
      }
      if (this.activeTime instanceof Array && this.activeTime.length) {
        postData.effect_time_start = this.activeTime[0]
        postData.effect_time_end = this.activeTime[1]
      }
      postData = this.pbFunc.fifterObjIsNull(postData)
      this.$$http('servicePackList', postData)
        .then(results => {
          if (results.data && results.data.code === 0) {
            this.tableData = results.data.content.instances
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
    this.getServicePackTypeList()
    this.getList()
  }
}
</script>
<style>
</style>
