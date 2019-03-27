<style scoped lang="less">
.el-table {
  /deep/ td {
    // padding: 0;
    font-size: 13px;
  }
  /deep/ .cell {
    padding: 0 !important;
  }
  td {
    vertical-align: middle;
    display: table-cell;

    li {
      padding: 6px 0;
      min-height: 24px;
      border-bottom: 1px solid #e4e7ed;

      &:last-child {
        border-bottom: 0;
      }

      /deep/ .el-checkbox__label {
        font-size: 13px;
      }
    }
  }
}
.setting {
  .setting-content {
    .nav-tab-setting {
      .department-list {
        padding-bottom: 20px;
        .el-menu {
          margin-bottom: 0;
        }
        .el-menu-item {
          position: relative;
          .project-btn {
            position: absolute;
            top: 0;
            right: 10px;
            display: none;
            button {
              height: 26px;
              padding: 0 8px;
              line-height: 23px;
            }
            .el-button + .el-button {
              margin-left: 5px;
            }
          }
          &:hover {
            .project-btn {
              display: block;
            }
          }
        }

        .department-btn button {
          margin-top: 10px;
          width: 60%;
        }
      }
    }
  }
}
</style>
<template>
  <div class="setting">
    <div class="nav-tab" v-if="false">
      <div class="tab-screen">
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row>
            <el-col :span="12">
              <el-input
                placeholder="请输入"
                v-model="searchFilters.keyword"
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
        </el-form>
      </div>
    </div>
    <div class="setting-content">
      <el-row :gutter="22">
        <el-col :span="5">
          <div class="nav-tab-setting">
            <el-tabs v-model="projectActive">
              <el-tab-pane label="类别" name="project">
                <div class="department-list">
                  <el-menu :default-active="active" class="el-menu-vertical-demo">
                    <el-menu-item
                      v-for="(item,key) in categoryList"
                      :index="key.toString()"
                      :key="item._id"
                      v-on:click="getProjectList(item,key)"
                    >
                      <i class="tab-icon"></i>
                      <span slot="title">{{item.project_name}}</span>
                      <div class="project-btn">
                        <el-button
                          type="success"
                          size="mini"
                          @click="editProject('category','update',item)"
                        >编辑</el-button>
                        <el-button
                          type="danger"
                          size="mini"
                          @click="deleteProject('category',item)"
                        >删除</el-button>
                      </div>
                    </el-menu-item>
                  </el-menu>
                  <div class="text-center department-btn">
                    <el-button
                      type="primary"
                      size="medium"
                      @click="editProject('category','add')"
                    >新增类别</el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="add-user-btn">
            <el-button type="success" size="medium" @click="editProject('project','add')">新增小项</el-button>
          </div>
          <div class="nav-tab-setting nav-tab-mt">
            <div class="position-list">
              <div class="table-list">
                <el-table
                  :data="projectTableData"
                  stripe
                  style="width: 100%"
                  size="mini"
                  v-loading="projectLoading"
                  :class="{'tabal-height-500':!projectTableData.length}"
                >
                  <el-table-column
                    v-for="(item,key) in thTableList"
                    :key="key"
                    :prop="item.param"
                    align="center"
                    :label="item.title"
                  ></el-table-column>
                  <el-table-column label="结算价" align="center">
                    <template slot-scope="scope">
                      <span class="text-blue cursor-pointer" v-on:click="goPage(scope.row)">设置结算价</span>
                      <!-- <el-button type="primary" size="mini" @click="editProject('project','update',scope.row)">编辑</el-button> -->
                      <!-- <el-button type="primary" size="mini" plain @click="editProject(scope.row.id)">删除</el-button> -->
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="primary"
                        size="mini"
                        @click="editProject('project','update',scope.row)"
                      >编辑</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        plain
                        @click="deleteProject('project',scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <no-data v-if="!projectLoading && !projectTableData.length"></no-data>
              </div>
            </div>
            <div class="page-list text-center">
              <el-pagination
                background
                layout="prev, pager, next,jumper"
                :total="pageData.totalCount"
                :page-size="pageData.pageSize"
                :current-page.sync="pageData.currentPage"
                @current-change="pageChange"
                @size-change="pageChange"
                v-if="!projectLoading && pageData.totalCount>pageData.pageSize"
              ></el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <category-dialog
      :category-dialog="categoryDialog"
      :row="categoryRow"
      v-on:closeDialogBtn="closeDialog"
    ></category-dialog>
    <project-dialog
      :project-dialog="projectDialog"
      :row="projectRow"
      v-on:closeDialogBtn="closeDialog"
      :belong-to="belongTo"
    ></project-dialog>
  </div>
</template>
<script>
import categoryDialog from '@/components/servicePackageManage/categoryDialog'
import projectDialog from '@/components/servicePackageManage/projectDialog'
export default {
  name: 'experienceProjectList',
  computed: {
    enterpriseId() {
      let users = this.pbFunc.getLocalData('users', true)
      return users.enterprise._id
    }
  },
  components: {
    categoryDialog: categoryDialog,
    projectDialog: projectDialog
  },
  data() {
    return {
      pageLoading: false,
      projectLoading: false,
      projectActive: 'project',
      active: '0',
      powerActive: '1',
      projectTableData: [],
      categoryDialog: {
        isShow: false,
        type: 'add'
      }, // 类别弹窗
      projectDialog: {
        isShow: false,
        type: 'add'
      }, // 小项弹窗
      categoryRow: {}, // 修改的类别信息
      projectRow: {}, // 修改的小项信息
      pageData: {
        currentPage: 1,
        totalPage: '',
        pageSize: 10
      },
      searchFilters: {
        employmentType: '',
        isBind: '',
        keyword: '',
        field: 'name'
      },
      selectData: {
        fieldSelect: [
          { id: 'name', value: '职位' },
          { id: 'mobile_phone', value: '部门' }
        ]
      },
      thTableList: [
        {
          title: '小项名称',
          param: 'project_name',
          width: ''
        },
        {
          title: '所属医院及结算价',
          param: 'project_price',
          width: ''
        }
      ],
      categoryList: [],
      belongTo: '' // 当前类别ID
    }
  },
  methods: {
    goPage(row) {
      window.open(
        `/#/servicePackageManage/experienceProjectManage/settlementPriceEdit/${
          row._id
        }/`,
        '_blank'
      )
    },
    closeDialog: function(type, isSave) {
      if (type === 'category') {
        this.categoryDialog.isShow = false
        if (isSave) {
          this.getCategoryList() // 类别列表
        }
      } else if (type === 'project') {
        this.projectDialog.isShow = false
        if (isSave) {
          this.getCategoryList() // 小项列表
        }
      }
    },
    // 获取小项列表
    getProjectList(row, key) {
      if (row) {
        this.belongTo = row._id
        // this.categoryRow = row;
        console.log(row)
        this.projectTableData = row.sub_projects
      }
    },
    // 获取类别列表
    getCategoryList() {
      let postData = {
        enterprise: this.enterpriseId
      }
      this.$$http('getProjectList', postData)
        .then(results => {
          if (results.data && results.data.code === 0) {
            this.categoryList = results.data.content
            if (this.categoryList.length) {
              if (this.belongTo) {
                this.categoryList.forEach((item, index) => {
                  if (item._id === this.belongTo) {
                    this.getProjectList(item)
                  }
                })
              } else {
                this.getProjectList(this.categoryList[0])
              }
            }
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.$message.error('获取列表失败！')
        })
    },
    pageChange() {},
    updateProject() {},
    // 编辑类别 小项
    editProject(category, type, row) {
      if (category === 'category') {
        this.categoryDialog = {
          isShow: true,
          type: type
        }
        if (row) this.categoryRow = row
      } else if (category === 'project') {
        this.projectDialog = {
          isShow: true,
          type: type
        }
        if (row) this.projectRow = row
      }
    },
    // 类别是否关联套餐
    isRelationProject() {
      return new Promise((resolve, reject) => {})
    },
    // 删除类别、小项
    deleteProject(type, row) {
      let apiName = 'deleteProject'
      let postData = {
        id: row._id
      }
      let title = type === 'category' ? '分类' : '小项'
      let deleteMsg =
        '请确认需要删除该' +
        title +
        '删除后不可找回，该操作不影响已新建的订单！'
      this.$msgbox({
        title: '删除' + title,
        message: deleteMsg,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '提交中...'
            this.$$http(apiName, postData).then(results => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
              if (results.data && results.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getCategoryList()
                done()
              } else {
                done()
                let deleteTip =
                  '无法删除，当前' +
                  title +
                  '有已下套餐正在使用，请配置后重新操作删除！'
                let setMeal = ''
                results.data.data.forEach((item, index) => {
                  setMeal += item.enterprise_name + '、'
                })
                this.$alert(
                  deleteTip + '<div>' + setMeal + '</div>',
                  '删除' + title,
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
    }
  },
  created: function() {
    this.getCategoryList()
  }
}
</script>
