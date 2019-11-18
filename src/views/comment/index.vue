<template>
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
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                width="150">
                <template>
                    <el-button type="primary">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        // console.log(res)
        this.articles = res.data.data.results
      })
    }
  }
}
</script>

<style>

</style>
