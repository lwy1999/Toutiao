<template>
  <div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户头像">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="onUpload">
          <img width="100" :src="user.photo" class="avatar" />
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
          <i hidden class="vatar-uploader-icon"></i>
          <!-- <p hidden>点击选择上传用户头像</p> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="user.intro"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import eventBus from '@/utils/event-bus'

export default {
  name: 'AccountIndex',
  data () {
    return {
      user: {
        email: '', // 邮箱
        intor: '', // 简介
        mobile: '', // 手机号
        name: '', // 昵称
        photo: '' // 头像
      }
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    // 修改账户信息
    onSubmit () {
      // const name = this.user.name
      // const email = this.user.email
      // const intro = this.user.intro
      const { name, email, intor } = this.user
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          email,
          intor
        }
      }).then(res => {
        eventBus.$emit('update-user', this.user)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        this.$message.error('修改信息失败')
      })
    },
    loadUserProfile () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        // console.log(res)
        this.user = res.data.data
      }).catch(() => {
        this.$message.error('获取数据失败')
      })
    },
    onUpload (config) {
      const fd = new FormData()
      fd.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      }).then(res => {
        // 更新图片地址
        this.user.photo = res.data.data.photo
        eventBus.$emit('update-user', this.user)
      }).catch(() => {
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style>
</style>
