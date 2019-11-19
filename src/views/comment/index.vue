<template>
<div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>评论管理</span>
        </div>
         <el-table
            :data="articles"
            style="width: 100%">
            <el-table-column
                prop="title"
                label="标题"
                width="320">
            </el-table-column>
            <el-table-column
                prop="total_comment_count"
                label="总评论数"
                width="150">
            </el-table-column>
            <el-table-column
                prop="fans_comment_count"
                label="粉丝评论数"
                width="150">
            </el-table-column>
            <el-table-column
                label="评论状态"
                width="150">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.comment_status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="onStatusChange(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button
                      type="primary"
                      @click="$router.push('/comment/'+scope.row.id)"
                    >修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="onPageChange"
      :disabled="loading">
    </el-pagination>
    <!-- /分页 -->
</div>
</template>

<script>
export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [],
      totalCount: 0, // 数据总页数
      loading: true, // 表格的 loading 状态
      page: 0
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          per_page: 10,
          response_type: 'comment'
        }
      }).then(res => {
        // console.log(res)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      }).catch(() => {
        console.log('获取数据失败')
      }).finally(() => {
        this.loading = false
      })
    },
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      }).catch(() => {
        this.$message.erroe('操作失败')
      })
    },
    // 数据分页
    onPageChange (page) {
      this.page = page
      this.loadArticles(page)
    }
  }
}
</script>

<style>

</style>
