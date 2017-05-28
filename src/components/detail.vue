<template>
  <transition name="move">
    <div class="detailWrapper" v-show="showDetail" ref="foodDetail">
      <div class="foodDetail">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
        <div class="foodImg">
          <img :src="food.image" alt="">
        </div>
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <transition name="fade">
            <div class="shopCart" v-show="!food.count || food.count==0" @click="addToCart">
              <div class="text">加入购物车</div>
            </div>
          </transition>
          <cart :food="food" ></cart>
        </div>
        <div class="divider" v-show="food.info"></div>
        <div class="desc" v-show="food.info">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">商品评价</div>
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
                <div class="userInfo">
                  <div class="time">{{item.rateTime | filterTime}}</div>
                  <div class="user">
                    <span>{{item.username}}</span>
                    <span class="avatar">
                <img :src="item.avatar" alt="" width="12" height="12">
              </span>
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="item.rateType? 'icon-thumb_down':'icon-thumb_up'"></span>
                  <div class="text">{{item.text}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import cart from './cart'
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import {mapMutations} from 'vuex'
  import {filterTime} from '../filter/filter'
  export default {
    props:[
      'food'
    ],
    data () {
      return {
        showDetail:false,
        evaluationType:[
          {name:'全部',count:0,comments:[],active:true},
          {name:'推荐',count:0,comments:[],active:false},
          {name:'吐槽',count:0,comments:[],active:false}
        ],
        comments: [],
        flag: true
      }
    },
    methods: {
      ...mapMutations([
        'vxAddCart'
      ]),
      show () {
        this.showDetail = true
        // 在DOM更新之前对评论数据进行处理
        this.$nextTick(() => {
          this.comments = this.food.ratings
          this.food.ratings.forEach(val => {
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
        })
        this.$nextTick( () => {
          if(!this.scroll){
            this.scroll=new BScroll(this.$refs.foodDetail,{click:true})
          }else{
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showDetail = false
      },
      selectType (item) {
        this.comments = item.comments
        this.evaluationType.forEach(val => {
          val.active = false
        })
        item.active = true
      },
      updateScroll () {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      addToCart () {
        if(!this.food.count){
          Vue.set(this.food,'count',1)
          Vue.set(this.food,'active',true)
        }
        if(this.food.active){
          this.vxAddCart(this.food)
          this.food.active = false
        }
      }
    },
    computed: {
      evaluation () {
        this.updateScroll()
        let evaluationArr = []
        if(this.flag){
          this.comments.forEach(val => {
            if(val.text.length > 0){
              evaluationArr.push(val)
            }
          })
          return evaluationArr
        }else{
          return this.comments
        }
      }
    },
    components: {
      cart
    },
    filters: {
      filterTime
    }
  }
</script>
<style>
  .foodImg{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    box-sizing: content-box;
  }
  .foodImg img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .fade-leave-active,.fade-enter-active{
    transition: opacity .4s linear
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
</style>
