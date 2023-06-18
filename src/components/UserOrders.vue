<template>
    <div class='container mx-auto max-w-2xl px-2'>
        <base-modal :show="openOrderModal" @close="closeModal">
        {{ text }}
        </base-modal>
        <div class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
            <div class="flex flex-col gap-y-5">
                <div class="flex gap-x-5">
                    <p><b>Choose the city</b></p>
                    <select v-model="choosenCity" @change="chooseCity">
                        <option value="choose">Choose</option>
                        <option v-for="cafe in shops" :key="cafe.id" :value="cafe.city">{{ cafe.city }}</option>
                    </select>
                </div>
                <div class="flex gap-x-5">
                    <p><b>Choose the address</b></p>
                    <select v-model="choosenShop" @change="chooseShop">
                        <option value="choose">Choose</option>
                        <option v-for="one in filteredShops" :key="one.id">{{ one.address }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-5" v-if="choosenShop">
                    <div>
                        <p><b>Cafe name:</b> {{ this.name }}</p>
                        <p><b>Contact phone:</b> {{ this.phone }}</p>
                    </div>
                    <p><b>Available positions:</b></p>
                    <table>
                        <thead>
                            <tr>
                                <td><b>Items</b></td>
                                <td><b>Price</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in positions" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ item.price }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="flex justify-center">
                    <button @click="makeOrder" type="button"
                    class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5 center
                    hover:text-white hover:bg-yellow-400 '>Order a coffee
                    </button>
                </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            coffeeShops:[],
            choosenCity:'',
            filteredShops:[],
            choosenShop:'',
            name:'',
            phone:'',
            positions:[{
                name:'',
                price:''
            }],
            openOrderModal:false,
            text:'Hello my dear friend'
        }
    },
    computed:{
       shops(){
        const shops = [...new Set(this.$store.getters.shops)];
        return shops
       },
       
    },
    methods:{
        chooseCity(){
            this.filteredShops = this.shops.filter(one => one.city == this.choosenCity)
        },
        chooseShop(){
            const shop = this.filteredShops.find(one => one.address == this.choosenShop);
            this.name = shop.name;
            this.phone = shop.phone;
            this.positions = shop.positions
        },
        makeOrder(){
            console.log('Make an order')
            this.openOrderModal = true
        },
        closeModal(){
            this.openOrderModal = false
        }
    },
    async mounted(){
        this.choosenCity = 'choose'
        try{
            await this.$store.dispatch('getCoffeeShops')
            
        }catch(error){
            console.log(error)
            
        }
    }
}
</script>