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
                class="search-filters-screen"
                @keyup.native.13="startSearch"
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
              <el-form-item label="性别:">
                <el-select v-model="searchFilters.gender" placeholder="请选择" @change="startSearch()">
                  <el-option
                    v-for="(item,key) in selectData.genderSelect"
                    :key="key"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="指派对象:">
                <el-select
                  v-model="searchFilters.service_agencies"
                  placeholder="请选择"
                  @change="startSearch()"
                >
                  <el-option
                    v-for="(item,key) in selectData.serviceAgencies"
                    :key="key"
                    :label="item.enterprise_name"
                    :value="item.enterprise_name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- <div class="operation-btn text-right">
        <el-button type="primary">导出</el-button>
        <el-button type="success" @click="goAddLink">新增</el-button>
      </div>-->
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
          ></el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleMenuClick(scope.row)">查看</el-button>
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
          v-if="!pageLoading && (pageData.totalCount/pageData.pageSize)>1"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'partnerRatingList',
  computed: {},
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
        service_agencies: '全部',
        keyword: '',
        gender: '',
        field: 'nick_name'
      },
      selectData: {
        serviceAgencies: [],
        genderSelect: [
          { id: '', value: '全部' },
          { id: '0', value: '女' },
          { id: '1', value: '男' },
          { id: '2', value: '未知' }
        ],
        fieldSelect: [
          { id: 'nick_name', value: '用户姓名' },
          { id: 'card_no', value: '身份证号' },
          { id: 'mobile_number', value: '联系电话' },
          { id: 'order_number', value: '订单编号' }
        ]
      },
      thTableList: [
        {
          title: '姓名',
          param: 'nick_name',
          width: ''
        },
        {
          title: '性别',
          param: 'genderStr',
          width: ''
        },
        {
          title: '年龄',
          param: 'age',
          width: ''
        },
        {
          title: '身份证号',
          param: 'card_no',
          width: ''
        },
        {
          title: '电话',
          param: 'mobile_number',
          width: ''
        },
        {
          title: '健康服务订单编号',
          param: 'order_number',
          width: ''
        },
        {
          title: '指派对象',
          param: 'service_agencies',
          width: ''
        }
      ],
      tableData: []
    }
  },
  methods: {
    goAddLink() {
      window.open(`/#/nstitutionalRating/rating/ratingEdit`, '_blank')
    },
    getPartnersList() {
      const users = this.pbFunc.getLocalData('users', true)
      const enterpriseId = users.enterprise._id
      this.$$http('associatedPartnersList', {
        need_all: true,
        enterpriseId: enterpriseId
      }).then(results => {
        if (results.data && results.data.code === 0) {
          this.selectData.serviceAgencies = results.data.content.instances
          this.selectData.serviceAgencies.unshift({
            enterprise_name: '全部'
          })
        }
      })
    },
    getRocordsList(postData) {
      this.pageLoading = true
      this.$$http('getRecordsList', postData)
        .then(results => {
          this.pageLoading = false
          if (results.data && results.data.code === 0) {
            this.tableData = results.data.content.instances
            this.tableData.forEach(item => {
              if (item.gender === '0') {
                item.genderStr = '女'
              } else if (item.gender === '1') {
                item.genderStr = '男'
              } else if (item.gender === '2') {
                item.genderStr = '未知'
              }
            })
            this.pageData.totalCount = results.data.content.count
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.pageLoading = false
        })
    },
    startSearch() {
      this.pageData.currentPage = 1
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        service_agencies:
          this.searchFilters.service_agencies !== '全部'
            ? this.searchFilters.service_agencies
            : '',
        gender: this.searchFilters.gender,
        search_type: this.searchFilters.field,
        search: this.searchFilters.keyword
      }
      this.postDataCopy = Object.assign({}, postData)
      this.getRocordsList(postData)
    },
    pageChange(page) {
      this.postDataCopy.page = page
      this.getRocordsList(this.postDataCopy)
    },
    handleMenuClick(row) {
      this.$router.push({
        path: `/userHealthManage/report/reportDetail/${row._id}`
      })
    }
  },
  created() {
    this.getPartnersList()
    this.startSearch()
  }
}
</script>
<style scoped lang="less">
.table-list {
  margin-top: 40px;
}
.tags {
  margin: 4px;
}
</style>
