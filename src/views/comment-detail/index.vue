<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论详情列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>

      <el-table :data="comments" style="width: 100%">
        <el-table-column label="头像" width="180">
          <template slot-scope="scope">
            <img width="50" :src="scope.row.aut_photo" />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" width="150"></el-table-column>
        <el-table-column prop="name" label="点赞" width="150">
          <template slot-scope="scope">{{ scope.row.is_liking === 1 ? '已赞' : '没有赞' }}</template>
        </el-table-column>
        <el-table-column prop="like_count" label="点赞数量" width="180"></el-table-column>
        <el-table-column prop="pubdate" label="评论日期" width="180">
          <template slot-scope="scope">
            <!--
              不传参：{{ scope.row.pubdate | dateFormat }}
              传参：{{ scope.row.pubdate | dateFormat(参数) }}
            -->
            {{ scope.row.pubdate | dateFormat('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_top"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onTop(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="reply_count" label="回复数量" width="180"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: []
    }
  },
  props: {
    acticleId: {
      type: String,
      requird: true
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    loadComments () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          // source: this.acticleId
          // source: this.$route.params.acticleId
          source: this.$route.params.acticleId
        },
        data: {
          allow_comment: true
        }
      }).then(res => {
        // console.log(res)
        const comments = res.data.data.results
        this.comments = comments
      })
    },
    onTop (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`,
        data: {
          sticky: comment.is_top
        }
      })
        .then(res => {
          this.$message('操做成功')
        })
        .catch(() => {
          this.$message.error('操作失败')
        })
    }
  }
}
</script>

<style>
</style>
