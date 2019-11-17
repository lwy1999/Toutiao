<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model='article.title'></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model='article.content'></el-input>
        </el-form-item>
        <el-form-item label="频道">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
                :label="channel.name"
                :value="channel.id"
                v-for=" channel in channels"
                :key="channel.id"
              ></el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="封面">
          <el-radio-group>
            <el-radio label="无图"></el-radio>
            <el-radio label="单图"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PublishArticle',
  data () {
    return {
      article: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          type: 0, // 封面类型 -1 自动  0- 无图 1- 1张 3- 3张
          images: []// 图片。无图就是空数组
        }
      },
      channels: {}
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
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
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
