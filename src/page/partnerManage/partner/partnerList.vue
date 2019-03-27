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
            <el-col :span="6">
              <el-form-item label="合作方类型:" label-width="100px">
                <el-select
                  v-model="searchFilters.enterprise_type"
                  placeholder="请选择"
                  filterable
                  @change="startSearch"
                >
                  <el-option
                    v-for="(item) in selectData.partnerTypeSelect"
                    :key="item._id"
                    :label="item.value"
                    :value="item._id"
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
          ></el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="newPage('detail',scope.row)">查看</el-button>
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
  </div>
</template>
<script>
export default {
  name: 'partnerList',
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
        partnerTypeSelect: [{ _id: '', id: '', value: '全部' }],
        fieldSelect: [
          { id: 'enterprise_name', value: '合作方名称' },
          { id: 'contact', value: '联系人' },
          { id: 'contact_phone', value: '联系电话' }
        ]
      },
      thTableList: [
        {
          title: '合作方名称',
          param: 'enterprise_name',
          width: ''
        },
        {
          title: '合作方类型',
          param: 'enterprise_type.type_name',
          width: ''
        },
        {
          title: '联系人',
          param: 'contact',
          width: ''
        },
        {
          title: '联系电话',
          param: 'contact_phone',
          width: ''
        }
      ],
      tableData: []
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
    newPage(type, row) {
      if (type === 'add') {
        window.open(`/#/partnerManage/partner/partnerEdit`, '_blank')
      } else if (type === 'detail') {
        window.open(
          `/#/partnerManage/partner/partnerDetail/${row._id}/`,
          '_blank'
        )
      }
    },
    // 合作方类型筛选列表
    getPartnerTypeList() {
      this.$$http('partnerTypeList', {}).then(results => {
        if (results.data && results.data.code === 0) {
          // this.selectData.partnerTypeSelect = Object.assign(
          //   this.selectData.partnerTypeSelect,
          //   results.data.content
          // );
          results.data.content.forEach((item, index) => {
            this.selectData.partnerTypeSelect.push({
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
        enterpriseId: this.enterpriseId
      }
      postData.search_type = this.searchPostData.field
      postData.search = this.searchPostData.keyword
      // postData[this.searchPostData.field] = this.searchPostData.keyword
      if (this.searchPostData.enterprise_type) {
        postData.enterprise_type = this.searchPostData.enterprise_type
      }
      postData = this.pbFunc.fifterObjIsNull(postData)
      this.$$http('associatedPartnersList', postData)
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
    this.getPartnerTypeList()
    this.getList()
  }
}
</script>
<style>
</style>
