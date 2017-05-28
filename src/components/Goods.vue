<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,$index) in datas.goods" :class="{current:currentIndex===$index}" @click="selectMenu($index)">
          <span class="text">
            <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in datas.goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}</span>
                  <span class="rating">好评率{{food.rating}}</span>
                  <div class="price">
                    <span class="newPrice">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart :food="food"></cart>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :food="food" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice" ></shopcart>
    <detail :food="selectedFood" ref="detail"></detail>

  </div>

</template>
<script>
  import icon from './header/icon'
  import shopcart from './shopCart'
  import cart from './cart'
  import detail from './detail'
  import BScroll from 'better-scroll'
  export default {
    props:['datas'],
    data () {
      return {
        icon:icon,
        heightList:[],
        scrollY:0,
        clickBool: true,
        selectedFood: {}
        // goods:this.datas.goods
      }
    },
    computed: {
      // 计算index值与左侧mune的index匹配
      currentIndex () {
        for (let i=0;i<this.heightList.length;i++) {
          let height1 = this.heightList[i];
          let height2 = this.heightList[i+1];
          if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
            return i
          }
        }
        return 0
      },
      food () {
        let foodArr = [];
        this.datas.goods.forEach(goods => {
          goods.foods.forEach(foods => {
            if(foods.count>0){
              foodArr.push(foods)
            }
          })
        })
        return foodArr
      }
    },
    methods:{
      // 已选中商品
      selectFood (food,ev) {
        if(!ev._constructed){
          return;
        }
        this.$refs.detail.show();
        this.selectedFood = food
      },
      scroll () {
        new BScroll(this.$refs.menuWrapper,{click:true})
        this.scrollFood = new BScroll(this.$refs.foodsWrapper,{click:true,probeType:3})
        this.scrollFood.on('scroll',pos => {
          // console.log(pos.y)
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 计算右侧goods区间高度
      calculateHeight () {
        let Height = 0;
        this.heightList.push(Height);
        let foodHook = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        for (let i=0;i<foodHook.length;i++) {
          let item = foodHook[i];
          Height +=  item.clientHeight;
          this.heightList.push(Height);
        }
      },
      // 左侧menu点击右侧响应滚动
      selectMenu (index) {
        // 阻止pc端响应2次点击事件
        //  if(!ev._constructed){
        //    return ;
        //  }
        //ev.cancelBubble = true
        if(this.clickBool){
          let foodHook = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let scrollEl = foodHook[index];
          this.scrollFood.scrollToElement(scrollEl,300)
          this.clickBool = !this.clickBool;
          setTimeout(() => {
            this.clickBool = !this.clickBool;
          },100)
        }
      }
    },
    mounted () {
      this.scroll()
      this.calculateHeight ()
    },
    components:{
      shopcart,
      cart,
      detail
    }
  }
</script>
<style>
  .goods .menu-wrapper .menu-item.current{
    z-index:10;
    background: #fff;
    border-left:3px solid #3879d9;
    padding-left:9px;
  }
  .goods .menu-wrapper .menu-item.current span{
    font-weight: 700;
  }

</style>
