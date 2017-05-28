<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports">
          <div class="supports_desc">
            <span class="icon decrease"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="support-count" @click="show =!show">
        <span class="count">{{seller.supports.length}}</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="show =!show">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="show">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :score="seller.score" :isStar48="isStar48" :isStar36="isStar36" :isStar24="isStar24"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="icon[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin" v-text="seller.bulletin"></div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="show =!show"></i>
      </div>
    </div>
    </transition>
  </div>

</template>
<script>
  import star from './star'
  import icon from './icon'
  export default {
    props:['seller'],
    data () {
      return {
        icon: icon,
        show: false,
        isStar48: true,
        isStar36: false,
        isStar24: false
      }
    },
    components:{
      star
    }
  }
</script>
<style>


</style>
