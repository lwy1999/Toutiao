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
          <quill-editor v-model="article.content" ref="myQuillEditor" :options='editorOption'></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type > 0">
            <el-row :gutter="20">
              <el-col :span="4" v-for="item in article.cover.type" :key="item">
                <UploadImage>
                </UploadImage>
              </el-col>
            </el-row>
          </template>
        </el-form-item>
        <el-form-item label="频道">
          <!-- <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
                :label="channel.name"
                :value="channel.id"
                v-for=" channel in channels"
                :key="channel.id"
              ></el-option>
            </el-select> -->
          <channel-select v-model="article.channel_id"></channel-select>
        </el-form-item>
        <!-- <el-form-item label="封面">
          <el-radio-group>
            <el-radio label="无图"></el-radio>
            <el-radio label="单图"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'
import ChannelSelect from '@/components/channel-select'
import UploadImage from './components/upload-image'
export default {
  name: 'PublishArticle',
  components: {
    quillEditor,
    ChannelSelect,
    UploadImage
  },
  data () {
    return {
      article: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          type: 1, // 封面类型 -1 自动  0- 无图 1- 1张 3- 3张
          images: []// 图片。无图就是空数组
        },
        channel_id: ''
      },
      channel: [],
      editorOption: {}// 富文本编辑器的配置选项对象
    }
  },
  created () {
    // this.loadChannels()
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    // // 筛选频道
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     // console.log(res)
    //     this.channels = res.data.data.channels
    //   }).catch(err => {
    //     console.log(err, '数据错误')
    //   })
    // },
    // 发布文章
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.updateArticle()
      } else {
        this.addArticle()
      }
    },
    loadArticle () {
      this.$axios({
        url: `/articles/${this.$route.params.articleId}`,
        method: 'GET'
      }).then(res => {
        this.article = res.data.data
        console.log(this.article)
      })
    },
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        // query 参数
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err, '数据错误')
      })
    },
    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    }
  }
}
</script>

<style lang="less" >
.ql-editor {
  height: 350px;
}
</style>>
