<template>
  <div class="shopCart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo active">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="badge" v-show="totalPrice">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active':totalPrice}">￥{{totalPrice}}</div>
        <div class="desc" v-show="totalPrice<99">需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice>=minPrice+this.deliveryPrice}">
        <div class="pay" >{{startPrice}}</div>
      </div>
    </div>
    <transition name="transHeight">
      <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food" v-for="item in food">
            <span class="name">{{item.name}}</span>
            <div class="price">
              <span>￥{{item.price}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cart :food="item"></cart>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>

</template>
<script>
  import cart from './cart'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        show: true
      }
    },
    props:['deliveryPrice','minPrice','food'],
    methods: {
      // 清空购物车
      empty () {
        this.food.forEach(food => {
          food.count = 0
        })
      },
      toggleList () {
        if(!this.totalCount){
          return
        }
        this.show = !this.show
      }
    },
    computed: {
      listShow () {
        if(!this.totalCount){
          this.show = true
          return false
        }
        let fold = !this.show;
        if(fold){
          this.$nextTick(() => {
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.listContent,{click:true})
            }else{
              this.scroll.refresh()
            }
          })
        }
        return fold
      },
      totalPrice () {
        let total = 0;
        this.food.forEach(food => {
          total += food.count * food.price
        })
        if(total<99)total+=this.deliveryPrice
        if(this.totalCount==0){
          total-=this.deliveryPrice
        }
        return total
      },
      totalCount () {
        let totalCount = 0;
        this.food.forEach(food => {
          totalCount += food.count
        })
        return totalCount
      },
      // 起送价
      startPrice () {
        if(this.totalPrice==0){
          return `最低${this.minPrice}起送`
        }else if(this.totalPrice<this.minPrice+this.deliveryPrice){
          return `还差￥${this.minPrice-this.totalPrice+this.deliveryPrice}起送`
        }else{
          return '去结算'
        }
      }
    },
    components: {
      cart
    }
  }
</script>
<style>


</style>
