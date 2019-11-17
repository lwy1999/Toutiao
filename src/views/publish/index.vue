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
          <quill-editor
            v-model="article.content"
            ref="myQuillEditor"
            :options='editorOption'
          ></quill-editor>
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
export default {
  name: 'PublishArticle',
  components: {
    quillEditor
  },
  data () {
    return {
      article: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          type: 0, // 封面类型 -1 自动  0- 无图 1- 1张 3- 3张
          images: []// 图片。无图就是空数组
        },
        channel_id: ''
      },
      channels: [],
      editorOption: {} // 富文本编辑器的配置选项对象
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
    onSubmit (draft) {
      // console.log('submit!')
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
    }
  }
}
</script>

<style>

</style>
