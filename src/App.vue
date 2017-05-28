<template>
  <div id="app">
    <header-top :seller="datas.seller"></header-top>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
    </div>
    <router-view :datas="datas" ref="childrenComponent"></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import headerTop from './components/header/header'
export default {
  name: 'app',
  data () {
    return {
      datas:{
        seller: {},
        goods: null,
      }
    }
  },
  mounted () {
    document.addEventListener('visibilitychange',this.changeTitle,false)
    axios.get('/static/data/data.json').then(res => {
      this.datas.seller = res.data.seller;
      this.datas.goods = res.data.goods;
      this.$nextTick(() => {
        // console.log(this.$refs.childrenComponent);
        this.$refs.childrenComponent.scroll && this.$refs.childrenComponent.scroll();
        this.$refs.childrenComponent.calculateHeight && this.$refs.childrenComponent.calculateHeight()
      })
    })
  },
  methods: {
    // 切换标签页改变title
    changeTitle () {
      if(document.hidden){
        document.title = 'vue2.0-elm'
      }else{
        document.title = '战斗吧！赛亚人'
      }
    }
  },
  components: {
    headerTop
  }
}
</script>

<style>
</style>
