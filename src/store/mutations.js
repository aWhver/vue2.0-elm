export default {
  vxAddCart (state,val) {
    state.vxListFood.push(val)
  },
  vxDecreaseCart (state,val) {
    state.vxListFood.forEach((food,index) => {
      if(food.name === val.name){
        state.vxListFood[index].count--
        if( state.vxListFood[index].count===0){
          state.vxListFood.splice(index,1)
        }
      }
    })
  }
}
