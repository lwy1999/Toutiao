<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button> -->
        <el-upload
          class="upload-demo"
          style="float: right;"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          :on-success="onUploadSuccess"
          :show-file-list="false"
        >
          <!-- <el-button size="small" type="primary">点击上传</el-button> -->
        </el-upload>
        <el-button style="float: right; margin-right: 10px" type="success" @click="onUpload">点击上传</el-button>
        <input type="file" hidden ref="file" @change="onFileChange" />
      </div>
      <div style="margin-bottom: 20px;">
        <el-radio-group v-model="type" @change="onFind">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="4" v-for="item in images" :key="item.id" class="col-item">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.url" class="image" height="200" />
            <div style="padding: 14px;" class="action">
              <!-- class 还支持对象语法， -->
              <i
                style="cursor: pointer;"
                :class="{
                  'el-icon-star-on': item.is_collected,
                  'el-icon-star-off': !item.is_collected
                }"
                @click="onCollect(item)"
              ></i>
              <!-- class 本来就是绑定数据字符串 -->
              <i class="el-icon-delete-solid" @click="onDelete(item)"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  name: 'MediaIndex',
  data () {
    return {
      images: [],
      type: '全部',
      // 给上传组件使用的请求头
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否收藏图片
        }
      })
        .then(res => {
          this.images = res.data.data.results
        })
        .catch(err => {
          console.log(err)
        })
    },
    onFind (value) {
      this.loadImages(value !== '全部')
    },
    // 请求收藏  /取消收藏
    onCollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          // 更新视图展示
          item.is_collected = !item.is_collected
        })
        .catch(() => {
          this.$message.error('操作失败')
        })
    },
    // 删除图片
    onDelete (item) {
      this.$confirm('您执行的该操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelfirmButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定执行
          this.$axios({
            method: 'DELETE',
            url: `/user/images/${item.id}`
          })
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              // 更新列表
              this.loadImages(this.type !== '全部')
            })
            .catch(() => {
              this.$message.error('删除失败')
            })
        })
        .catch(() => {
          // 取消执行
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    onUploadSuccess () {
      // 手动触发DOM的点击事件
      this.loadImages(this.type !== '全部')
    },
    onUpload () {
      this.$refs.file.click()
    },
    onFileChange () {
      // 获取用户选择的那个文件对象
      const fileObj = this.$refs.file.files[0]
      // 创建一个表单数据对象
      const formData = new FormData()
      // 手动网表单数据中添加成员
      formData.append('image', fileObj)
      // 请求上传
      this.$axios({
        method: 'POST',
        url: '/user/images',
        data: formData
      })
        .then(res => {
          this.loadImages(this.type !== '全部')
        })
        .catch(() => {
          this.$message.error('上传失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.grid-content {
  background-color: pink;
}

.col-item {
  margin-bottom: 20px;
  .action {
    display: flex;
    justify-content: space-around;
    font-size: 24px;
  }
}
</style>>
