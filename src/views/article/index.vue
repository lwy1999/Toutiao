<template>
<div class="article">
    <!-- 筛选数据 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>全部图文</span>
        </div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="文章状态">
                <el-radio-group v-model="filterForm.status">
                    <el-radio :label="null">全部</el-radio>
                    <el-radio label="0">草稿</el-radio>
                    <el-radio label="1">待审核</el-radio>
                    <el-radio label="2">审核通过</el-radio>
                    <el-radio label="3">审核失败</el-radio>
                    <el-radio label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表">
                <el-select v-model="filterForm.channel_id" placeholder="请选择频道">
                  <el-option label="所有频道" :value="null"></el-option>
                  <el-option
                    :label="channel.name"
                    :value="channel.id"
                    v-for=" channel in channels"
                    :key="channel.id"
                  ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
                <el-date-picker
                v-model="rangeDate"
                type="daterange"
                range-separator="-"
                value-format:yyyy-MM-dd
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loadArticles(1)">查询</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- /筛选数据 -->
    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clesrfix">
          <span>共找到{{ this.totalCount }}条符合条件的内容</span>
      </div>
      <el-table
        :data="articles"
        style="width: 100%"
        v-loading='loading'
      >
        <el-table-column
            prop="date"
            label="封面"
            width="180">
            <template slot-scope="scope">
                <img width='60' :src="scope.row.cover.images[0]">
            </template>
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
                <!-- <span v-show="scope.row.status===0">草稿</span>
                <span v-show="scope.row.status===1">待审核</span>
                <span v-show="scope.row.status===2">审核通过</span>
                <span v-show="scope.row.status===3">审核失败</span>
                <span v-show="scope.row.status===4">已删除</span> -->

                <!-- <span>{{ articleStatus[scope.row.status].label }}</span> -->

                <el-tag :type="articleStatus[scope.row.status].type">
                    {{ articleStatus[scope.row.status].label }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column
            prop="pubdate"
            label="发布时间">
        </el-table-column>
        <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
                <el-button type="primary" size="mini">编辑</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- /文章列表 -->
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
  name: 'Article',
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null
      },
      rangeDate: '',
      articles: [],
      articleStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'info',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      totalCount: 0, // 数据总页数
      loading: true, // 表格的  loading 状态
      page: 0,
      channels: {},
      rangeData: []
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  methods: {
    // 数据加载
    loadArticles (page = 1) {
      this.loading = true
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/articles',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
        // Query参数
        params: {
          page,
          per_page: 10,
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[0] : null
        }
      }).then(res => {
        // console.log(res)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log('数据错误', err)
      }).finally(() => { // 无论成功还是失败，最终都要执行
        // 停止 loading
        this.loading = false
      })
    },
    // 数据分页
    onPageChange (page) {
      this.page = page
      this.loadArticles(page)
    },
    // 筛选频道
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '数据错误')
      })
    },
    onDelete (articleId) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleId}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
    margin-bottom: 20px;
}
</style>
