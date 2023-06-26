<template>
    <teleport to="body">
        <transition name="dialog">
            <div class="fixed flex-col pt-40 items-center top-0 left-0 h-screen w-screen bg-black bg-opacity-75 z-10 " v-if="show">
                <div v-if="show" class='container mx-auto max-w-lg px-2' >
                    <div class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
                          <div class="flex justify-end">
                            <button type="button" @click="closeWithNoOrder">✖️</button>
                          </div>
                      <div class="flex flex-col content-center items-center gap-y-3 pb-3">
                          <h1 class="font-bold text-lg">{{ name }}</h1>
                          <h2>{{ address }}</h2>
                      </div>
                      <div class="pb-5">
                          <p class="pb-3 font-bold ">Choose you coffee</p>
                            <select v-model="choosenItem" class="border-2 rounded-full p-2 text-left">
                              <option value="choose">Choose position</option>
                              <option v-for="(one, index) in positions" :key="index" :value="{'name':one.name, 'price':one.price}">{{ one.name }}, {{ one.price }} UAH</option>
                            </select>
                            <button type="button" @click="addToOrderList" class="pl-5"><b>Add</b> ➕</button>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Order items</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(one, index) in orderList" :key="index">
                            <td>{{ one.name }} </td>
                            <td class="pr-5 ">{{ one.price }} UAH</td>
                            <td>
                              <button type="button" @click="removeFromOrderList(index)">✖️</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p class="text-red-600 text-xs pt-3" v-if="isOrderListEmpty">Choose at least one position</p>
                      <p class="font-bold pt-5">Total price: {{ total}} UAH</p>
                      <div class="flex items-center justify-center">
                      <button @click="approveOrder" type="button"
                    class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5 center
                    hover:text-white hover:bg-yellow-400 '>Make an order
                    </button>
                  </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script>    
export default{
    props:{
        show:{
            type:Boolean,
            required:true
        },
        name:{
            required:true,
            type:String
        },
        address:{
          type:String,
          required:true,
        },
        positions:{
          required:true
        },
    },
    emits: ['close','closeNoOrder'],
    data(){
      return{
        orderList:[],
        choosenItem:{
          name:'',
          price:''
        },
        total:0,
        isOrderListEmpty:false
      }
    },
    methods:{
        closeModal(){
          if(!this.orderList.length){
            this.isOrderListEmpty = true;
            return
          }
          this.isOrderListEmpty = false
          this.$emit('close', this.orderList)
          this.orderList = [];
          this.choosenItem = 'choose';
          this.total = 0
        },
        closeWithNoOrder(){
          this.$emit('closeNoOrder')
          this.orderList = [];
          this.choosenItem = 'choose';
          this.total = 0;
          this.isOrderListEmpty = false
        },
        addToOrderList(){
          this.orderList.push(this.choosenItem)

          this.total = this.total + Number(this.choosenItem.price)
          
          
        },
        removeFromOrderList(index){      
            const [item] = this.orderList.splice(index, 1);
            this.total = this.total - Number(item.price)  
        },
        approveOrder(){
          console.log('Request');
          this.closeModal()
          
        }
    },
    mounted(){
      this.choosenItem = 'choose'
    }

}
</script>
<style scoped>

  .dialog-enter-from,
  .dialog-leave-to{
    opacity: 0;
    transform: scale(0.8);
  }
  .dialog-enter-active{
    transition: all 0.3s ease-out;
  }
  .dialog-leave-active{
    transition: all 0.3s ease-in;
  }


  .dialog-enter-to,
  .doalog-leave-from{
    opacity: 1;
    transform: scale(1);
  }

</style>