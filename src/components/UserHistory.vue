<template>
    <div class='container mx-auto max-w-5xl px-2'>
        <div class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
            <h1 class="text-center text-2xl font-bold pb-5">Orders</h1>
            <div class="flex flex-col gap-y-3">
            <div class="flex justify-between border-2 border-black rounded-lg p-5 pt-5 bg-white" v-for="(item,index) in orders" :key="index">
                <p>{{ item.fromCafe }}</p>
                <div>
                <ul v-for="(pos, i) in item.positions" :key="i" class="flex flex-col"> 
                    <li>{{ pos.name }} {{ pos.price }}</li>
                </ul>
            </div>
                <p>{{ item.status }}</p>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    computed:{
        orders(){
            return this.$store.getters.orders
        }
    },
    async mounted(){
        await this.$store.dispatch('getOrders', 'user')
    }
}
</script>