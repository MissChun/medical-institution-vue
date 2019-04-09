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
                <el-select
                  v-model="searchFilters.enterprise_type"
                  placeholder="请选择"
                  @change="startSearch()"
                >
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
                  v-model="searchFilters.enterprise_type"
                  placeholder="请选择"
                  @change="startSearch()"
                >
                  <el-option
                    v-for="(item,key) in selectData.enterpriseType"
                    :key="key"
                    :label="item.value"
                    :value="item.id"
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
        enterprise_type: '',
        keyword: '',
        field: 'enterprise_name'
      },
      selectData: {
        enterpriseType: [
          { id: '', value: '全部' },
          { id: 'hospital', value: '医疗机构' },
          { id: 'health-management-company', value: '健康管理公司' },
          { id: 'third-company', value: '三方健康管理公司' }
        ],
        genderSelect: [
          { id: '', value: '全部' },
          { id: '0', value: '女' },
          { id: '1', value: '男' },
          { id: '2', value: '未知' }
        ],
        fieldSelect: [
          { id: 'enterprise_name', value: '用户姓名' },
          { id: 'credit_code', value: '身份证号' },
          { id: 'enterprise_name', value: '联系电话' },
          { id: 'credit_code', value: '订单编号' },
          { id: 'credit_code', value: '异常小项名称' }
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
          param: 'identity_card',
          width: ''
        },
        {
          title: '电话',
          param: 'mobile_number',
          width: ''
        },
        {
          title: '健康服务订单编号',
          param: 'identity_card',
          width: ''
        },
        {
          title: '指派对象',
          param: 'mobile_number',
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
    getRatingList(postData) {
      this.pageLoading = true
      this.$$http('getRatingList', postData)
        .then(results => {
          this.pageLoading = false
          if (results.data && results.data.code === 0) {
            this.tableData = results.data.content.instances
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
        enterprise_type: this.searchFilters.enterprise_type,
        search_type: this.searchFilters.field,
        search: this.searchFilters.keyword
      }
      this.postDataCopy = Object.assign({}, postData)
      this.getRatingList(postData)
    },
    pageChange(page) {
      console.log('page', page)
      this.postDataCopy.page = page
      this.getRatingList(this.postDataCopy)
    },
    handleMenuClick(row) {
      console.log('row', row)
      this.$router.push({
        path: `/partnerManage/partnerRating/partnerRatingEdit/${row._id}`
      })
    }
  },
  created() {
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
