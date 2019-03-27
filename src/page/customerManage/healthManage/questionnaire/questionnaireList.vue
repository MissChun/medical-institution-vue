<style scoped lang="less">
.nav-tab .el-row {
  padding: 0 !important;
}
</style>
<template>
  <div>
    <div class="nav-tab">
      <div class="tab-screen border-top">
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-form-item label="姓名:">
                <div>{{detail.nick_name}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-form-item label="性别:">
                <div>{{detail.genderStr}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              <el-form-item label="年龄:">
                <div>{{detail.age}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn text-right" v-if="false">
        <!-- <el-button type="primary" plain>导入</el-button> -->
        <!-- <el-button type="primary">导出</el-button> -->
        <el-button type="success" @click="newPage('add')">新增</el-button>
      </div>
      <div class="table-list mt-25">
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
              <div>{{scope.row[item.param]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <!-- <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="newPage('detail',scope.row)">查看</el-button>
            </template>-->
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
  </div>
</template>
<script>
export default {
  name: 'physicalList',
  computed: {
    enterpriseId() {
      let users = this.pbFunc.getLocalData('users', true)
      return users.enterprise._id
    },
    id: function() {
      return this.$route.params.id || ''
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
      searchPostData: {}, // 搜索参数
      searchFilters: {
        enterprise_type: '',
        keyword: '',
        field: 'nick_name'
      },
      selectData: {
        abnormalSelect: [
          { id: '', value: '全部' },
          { id: '0', value: '是' },
          { id: '1', value: '否' }
        ],
        fieldSelect: [
          { id: 'nick_name', value: '姓名' },
          { id: 'mobile_number', value: '电话' }
        ]
      },
      thTableList: [
        {
          title: '编号',
          param: 'type',
          width: ''
        },
        {
          title: '问卷标题',
          param: 'name',
          width: ''
        },
        {
          title: '填写时间',
          param: 'question_date',
          width: ''
        }
      ],
      tableData: [],
      detail: {} // 详情
    }
  },
  methods: {
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
    // 用户详情
    getDetail: function() {
      return new Promise((resolve, reject) => {
        this.$$http('consumersDetail', { id: this.id })
          .then(results => {
            if (results.data && results.data.code === 0) {
              this.detail = results.data.content
              if (this.detail.gender === '0') {
                this.detail.genderStr = '女'
              } else if (this.detail.gender === '1') {
                this.detail.genderStr = '男'
              } else {
                this.detail.genderStr = '未知'
              }
              resolve(results.data)
            } else {
              reject(results.data)
            }
          })
          .catch(err => {
            reject(err)
            this.$message.error('获取详情失败！')
          })
      })
    },
    newPage(type, row) {
      if (type === 'detail') {
        window.open(
          `/#/customerManage/healthManage/physical/physicalDetail/${row._id}/`,
          '_blank'
        )
      }
    },
    // 列表
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
        // card_no: this.detail.identity_card
        // enterpriseId: this.enterpriseId
      }
      //   postData.search_type = this.searchPostData.field
      //   postData.search = this.searchPostData.keyword

      postData = this.pbFunc.fifterObjIsNull(postData)
      this.$$http('questionnaireList', postData)
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
    this.getDetail().then(data => {
      if (data.code === 0) {
        this.getList()
      }
    })
  }
}
</script>
