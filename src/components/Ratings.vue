<template>
  <div class="ratingsWrapper" ref="ratingWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{((datas.seller.serviceScore + datas.seller.foodScore)/2).toFixed(1)}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{datas.seller.rankRate}}%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :score="datas.seller.serviceScore" :isStar48="isStar48" :isStar36="isStar36"></star>
            <span class="num">{{datas.seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">商品评分</span>
            <star :score="datas.seller.foodScore" :isStar48="isStar48" :isStar36="isStar36"></star>
            <span class="num">{{datas.seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{datas.seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
        <div class="classify">
          <span @click="selectType(item)" class="item" :class="{'active':item.active,'bad':$index===2,'badActive':$index===2&&item.active}" v-for="(item,$index) in evaluationType">{{item.name}}<span class="count">{{item.count}}</span></span>
        </div>
        <div class="switch" @click="flag = !flag">
          <span class="icon-check_circle" :class="{'on':flag}"></span>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="evel-list">
          <ul>
            <li class="evel" v-for="item in evaluation">
             <div class="avatar">
               <img :src="item.avatar" width="28" height="28" alt="">
             </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{item.username}}</span>
                  <span class="rateTime">{{item.rateTime | filterTime}}</span>
                </div>
                <div class="star-wrapper">
                  <star :score="item.score" :isStar48="isStar48" :isStar36="isStar36" :isStar24="isStar24"></star>
                  <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">{{item.text}}</div>
                <div class="recommend">
                  <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="dish" v-for="dish in item.recommend">{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import star from './header/star'
  import {filterTime} from '../filter/filter'
  export default {
    props: [
      'datas'
    ],
    data () {
      return {
        isStar48: false,
        isStar36: true,
        isStar24: true,
        evaluationType:[
          {name:'全部',count:0,comments:[],active:true},
          {name:'推荐',count:0,comments:[],active:false},
          {name:'吐槽',count:0,comments:[],active:false}
        ],
        ratings: null,
        flag: true
      }
    },
    mounted () {
      axios.get('/static/data/data.json').then(res => {
        this.$nextTick(() => {
          this.ratings = res.data.ratings
          this.ratings.forEach(val => {
            this.evaluationType[0].count++
            this.evaluationType[0].comments.push(val)
            if(val.rateType){
              this.evaluationType[2].count++
              this.evaluationType[2].comments.push(val)
            }else{
              this.evaluationType[1].count++
              this.evaluationType[1].comments.push(val)
            }
          })
          this.scroll()
        })
      })
    },
    methods: {
      selectType (item) {
        this.ratings = item.comments
        this.evaluationType.forEach(val => {
          val.active = false
        })
        item.active = true
      },
      scroll () {
        this.$nextTick( () => {
          if(!this.scrolls){
            this.scrolls=new BScroll(this.$refs.ratingWrapper,{click:true})
          }else{
            this.scrolls.refresh()
          }
        })
      },
      updateScroll () {
        this.$nextTick(() => {
          this.scrolls.refresh()
        })
      }
    },
    computed: {
      evaluation () {
        this.updateScroll()
        let evaluationArr = []
        if(this.flag){
          this.ratings.forEach(val => {
            if(val.text.length>0){
              evaluationArr.push(val)
            }
          })
          return evaluationArr
        }else{
          return this.ratings
        }
      }
    },
    filters: {
      filterTime
    },
    components: {
      star
    }
  }
</script>
<style>


</style>
