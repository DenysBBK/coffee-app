<template>
    <div>
        Here will be orders
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    async mounted(){
        try{
            await this.$store.dispatch('getOrders')
        }catch(error){
            console.log(error)
            
        }
    }
}
</script>