<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="text">{{datas.seller.name}}</div>
          <div class="star-wrapper">
            <star :score="datas.seller.score" :isStar48="isStar48" :isStar36="isStar36" :isStar24="isStar24"></star>
            <span class="rate-count">({{datas.seller.ratingCount}})</span>
            <span class="sell-count">月售{{datas.seller.sellCount}}单</span>
          </div>
          <div class="collect">
            <span @click="clickCollect" class="icon-favorite" :class="{'active':isCollect}"></span>
            <span class="text">{{collect}}</span>
          </div>
        </div>
        <div class="remark">
          <div class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="num">{{datas.seller.minPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="num">{{datas.seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="num">{{datas.seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="activities">
        <div class="bulletin">
          <h1>公告与活动</h1>
          <div class="content">{{datas.seller.bulletin}}</div>
        </div>
      </div>
      <div class="supports">
        <ul>
          <li class="item" v-for="item in datas.seller.supports">
            <span class="iconMap" :class="icon[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="divider"></div>
      <div class="seller-imgs">
        <h1>商家实景</h1>
        <div class="wrapper" ref="imgWrapper">
          <div>
            <img :src="item" v-for="item in datas.seller.pics" width="120" height="90" alt="">
          </div>
        </div>
      </div>
      <div class="seller-info">
        <h1>商家信息</h1>
        <ul class="info-list">
          <li v-for="item in datas.seller.infos" class="info">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>
  import BScroll from 'better-scroll'
  import icon from './header/icon'
  import star from './header/star'
  export default {
    props: [
      'datas'
    ],
    data () {
      return {
        isStar48: false,
        isStar36: true,
        isStar24: false,
        isCollect: false,
        icon: icon,
        collect: '收藏'
      }
    },
    methods: {
      scroll () {
        new BScroll(this.$refs.sellerWrapper,{click:true})
        new BScroll(this.$refs.imgWrapper,{click:true,scrollX:true})
      },
      clickCollect () {
        this.isCollect = !this.isCollect
        this.collect = this.isCollect? '已收藏':'收藏'
      }
    },
    mounted () {
      this.scroll()
    },
    components: {
      star
    }
  }
</script>
<style>


</style>
