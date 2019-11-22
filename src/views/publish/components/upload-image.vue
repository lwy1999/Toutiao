<template>
  <div class="upload-image">
    <div class="preview" @click="onUploadShow">
      <!-- <img src="" class="avatar"> -->
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!-- visible控制显示或隐藏 -->
    <el-dialog title="请选择文章封面图片" :visible.sync="centerDialogVisible" width="50%" center>
      <!-- 标签导航 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <el-radio-group v-model="activeImage" @change="loadImages">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="collect">收藏</el-radio-button>
          </el-radio-group>
          <el-row :gutter="40">
            <el-col :span="6" v-for="item in images" :key="item.id">
              <img height="100" width="150" :src="item.url">
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">配置管理
        </el-tab-pane>
      </el-tabs>
      <!-- /标签导航 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  data () {
    return {
      centerDialogVisible: false,
      activeName: 'first',
      activeImage: 'all',
      images: []
    }
  },
  created () { },
  methods: {
    onUploadShow () {
      // 请求加载数据
      this.loadImages()
      // 显示弹窗
      this.centerDialogVisible = true
    },
    loadImages () {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: this.activeImage === 'collect' // 是否获取收藏图片
        }
      }).then(res => {
        this.images = res.data.data.results
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
.upload-image {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-image .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
