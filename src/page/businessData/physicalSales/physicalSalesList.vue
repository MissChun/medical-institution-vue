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
                    v-for="(item) in selectData.fieldSelect"
                    :key="item.id"
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
              <el-form-item label="订单生成时间:" label-width="110px">
                <el-date-picker
                  v-model="screenTime"
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
          ></el-table-column>
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
  name: 'physicalSalesList',
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
      searchPostData: {}, // 搜索参数
      searchFilters: {
        enterprise_type: '',
        keyword: '',
        field: 'enterprise_name'
      },
      selectData: {
        fieldSelect: [{ id: 'enterprise_name', value: '合作方名称' }]
      },
      thTableList: [
        {
          title: '合作方名称',
          param: 'enterprise_name',
          width: ''
        },
        {
          title: '体检订单下单数',
          param: 'total_count',
          width: ''
        },
        {
          title: '实际体检单数',
          param: 'actual_count',
          width: ''
        },
        {
          title: '应收金额',
          param: 'should_pay',
          width: ''
        },
        {
          title: '实收金额',
          param: 'actual_pay',
          width: ''
        }
      ],
      tableData: [],
      screenTime: [] // 筛选项
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
    newPage(type, row) {},
    // 列表
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        enterpriseId: this.enterpriseId,
        order_type: 'business-order'
      }
      postData.search_type = this.searchPostData.field
      postData.search = this.searchPostData.keyword
      if (this.screenTime && this.screenTime.length) {
        postData.created_at_start = this.screenTime[0]
        postData.created_at_end = this.screenTime[1]
      }
      postData = this.pbFunc.fifterObjIsNull(postData)
      this.$$http('businessDataList', postData)
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
    this.getList()
  }
}
</script>
<style>
</style>
