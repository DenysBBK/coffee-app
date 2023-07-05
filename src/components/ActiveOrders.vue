<template>
    <div class='container mx-auto max-w-5xl px-2'>
        <base-alert :show="showAlert" :alertType="typeOfAlert" >
            <p>{{ alertText }}</p>
        </base-alert>
        <div class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
            <h1 v-if="!ordersArr.length" class="text-center text-2xl font-bold pb-5">There is no active orders</h1>
            <h1 v-if="ordersArr.length" class="text-center text-2xl font-bold pb-5">Active orders</h1>
            <div class="flex flex-col gap-y-3">
            <div class="flex justify-between border-2 border-black rounded-lg p-5 pt-5 bg-white" v-for="(item,index) in ordersArr" :key="index">
                <p>{{ item.fromCafe }}</p>
                <div>
                <ul v-for="(pos, i) in item.positions" :key="i" class="flex flex-col"> 
                    <li>{{ pos.name }}, {{ pos.price }}/UAH</li>
                </ul>
            </div>
            <div>
                <p class="text-center border-2 rounded-full p-2"
                :class="{
                'bg-yellow-300' :item.status === 0,
                'bg-orange-400' :item.status === 1,    
                'bg-green-500' :item.status === 2, }">{{ status(item.status) }}</p>
                <button type="button" @click="finishOrder(item,index)"
                    class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5 center
                    hover:text-white hover:bg-yellow-400 ' v-if="item.status === 2">Finish</button>
            </div> 
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import alertMixin from '../components/mixins/alert.js'
export default{
    mixins:[alertMixin],
    data(){
        return{
            ordersArr:[]
        }
    },
    methods:{
        status(item){
            if(item === 0)return 'Pending';
            if(item === 1)return 'Preparing';
            if(item === 2)return 'Ready';
            if(item === 3)return 'Finished'
        },
        async finishOrder(item, index){
            this.ordersArr[index].status = 3
            let findOrder = {
                position:this.ordersArr[index].positionId,
                placeId:this.ordersArr[index].cafeId,
                status:3,
                type:'users'
            }

            
           try{
            await this.$store.dispatch('updateOrder', findOrder)
               await this.$store.dispatch('getOrders', 'user');
               this.ordersArr = this.$store.getters.orders.filter(one => one.status !== 3)
            //    this.ordersArr = this.$store.getters.orders
           }catch(error){
            this.useAlert('error', error.message)
            
           }    
           this.useAlert('success', 'Order is finished')     
            console.log('Order is finished')
            
        }
    },
    async mounted(){
        document.title = 'Active orders'
        await this.$store.dispatch('getOrders', 'user');
        this.ordersArr = this.$store.getters.orders.filter(one => one.status !== 3)
        
        
    }
}
</script>