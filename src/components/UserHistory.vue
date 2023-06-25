<template>
    <div class='container mx-auto max-w-5xl px-2'>
        <base-alert :show="showAlert" :alertType="typeOfAlert" >
            <p>{{ alertText }}</p>
        </base-alert>
        <div class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
            <h1 v-if="!ordersArr.length" class="text-center text-2xl font-bold pb-5">There is no orders</h1>
            <h1 v-if="ordersArr.length" class="text-center text-2xl font-bold pb-5">Orders History</h1>
            <div class="flex flex-col gap-y-3">
            <div class="flex justify-between border-2 border-black rounded-lg p-5 pt-5 bg-white" v-for="(item,index) in ordersArr" :key="index">
                <p>{{ item.fromCafe }}</p>
                <div>
                <ul v-for="(pos, i) in item.positions" :key="i" class="flex flex-col"> 
                    <li>{{ pos.name }}, {{ pos.price }}/UAH</li>
                </ul>
            </div>
            <div>
                <p>{{ date(item.cafeId)}}</p>
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
        date(date){
            let dd = new Date(date)
            return `${dd.getDate()}.${dd.getMonth()+1}.${dd.getFullYear()}`
        }
    },
    async mounted(){
        await this.$store.dispatch('getOrders', 'user');
        console.log('Hello!')
        this.ordersArr = this.$store.getters.orders.filter(one => one.status == 3)
        
        
    }
}
</script>