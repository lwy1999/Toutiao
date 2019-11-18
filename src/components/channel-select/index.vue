<template>
<div>
     <!-- <el-select
        :value='value'
        @input="$emit('input', $event)"
        placeholder="请选择频道"> -->
    <el-select
        :value='value'
        @input="oninput"
        placeholder="请选择频道">
        <el-option
            :label="channel.name"
            :value="channel.id"
            v-for=" channel in channels"
            :key="channel.id"
        ></el-option>
    </el-select>
</div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      channels: []
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
    oninput (data) {
      this.$emit('input', data)
    }
  }
}
</script>

<style>

</style>
