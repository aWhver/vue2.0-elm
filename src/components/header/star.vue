<template>
  <div class="star" :class="{'star-48':isStar48,'star-36':isStar36,'star-24':isStar24}">
    <span class="star-item" :class="item" v-for="item in ratings"></span>
  </div>

</template>
<script>
  export default {
    props:['score','isStar48','isStar36','isStar24'],
    computed: {
      ratings () {
        let allStar = Math.floor(this.score);
        let isHalfStar = this.score - allStar > 0.5 ;
        let starClassArr = [];
        for (let i = 0;i<allStar;i++){
          starClassArr.push('on')
        };
        if(isHalfStar){
          starClassArr.push('half')
        };
        while(starClassArr.length<5){
          starClassArr.push('off')
        }
        return starClassArr
      }
    }
  }
</script>
<style>


</style>
