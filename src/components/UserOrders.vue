<template>
    <div class='container mx-auto max-w-2xl px-2'>
        <base-alert :show="showAlert" :alertType="typeOfAlert" >
            <p>{{ alertText }}</p>
        </base-alert>
        <base-modal 
        :show="openOrderModal"
        :positions="positions"
        :name="shopName"
        :address="address"
        @close="closeModal"
        @closeNoOrder="noOrderClose">
        </base-modal>
        <div class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
            <div class="flex flex-col gap-y-5">
                <div class="flex gap-x-5 items-center">
                    <p ><b>Choose the city</b></p>
                    <select v-model="choosenCity" @change="chooseCity" class="border-2 rounded-full p-2 text-left">
                        <option value="choose">Choose</option>
                        <option v-for="cafe in shops" :key="cafe.id" :value="cafe.city">{{ cafe.city }}</option>
                    </select>
                </div>
                <div class="flex gap-x-5 items-center">
                    <p><b>Choose the address</b></p>
                    <select v-model="choosenShop" @change="chooseShop" class="text-left border-2 rounded-full p-2">
                        <option value="choose">Choose</option>
                        <option v-for="one in filteredShops" :key="one.id">{{ one.address }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-5" v-if="choosenShop !== 'choose' && choosenCity !== 'choose'">
                    <div>
                        <p><b>Cafe name:</b> {{ this.shopName }}</p>
                        <p><b>Contact phone:</b> {{ this.phone }}</p>
                    </div>
                    <p><b>Available positions:</b></p>
                    <table>
                        <thead>
                            <tr>
                                <td><b>Item</b></td>
                                <td><b>Price</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in positions" :key="index">
                                <td>{{ item.name }}</td>
                                <td>{{ item.price }} UAH</td>
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
import alertMixin from '../components/mixins/alert.js'
export default{
    mixins:[alertMixin],
    data(){
        return{
            coffeeShops:[],
            choosenCity:'',
            filteredShops:[],
            choosenShop:'',
            shopName:'',
            phone:'',
            positions:[{
                name:'',
                price:''
            }],
            openOrderModal:false,
            text:`Ordered menu`,
            id:'',
            address:''
        }
    },
    computed:{
       shops(){
        const shops = [...new Set(this.$store.getters.shops)];
        return shops
       },
       userData(){
        return this.$store.getters.user
       }
       
    },
    methods:{
        chooseCity(){
            this.filteredShops = this.shops.filter(one => one.city == this.choosenCity)
        },
        chooseShop(){
            const shop = this.filteredShops.find(one => one.address == this.choosenShop);
            this.shopName = shop.name;
            this.phone = shop.phone;
            this.positions = shop.positions;
            this.address = shop.address
            this.id = shop.id
            
        },
        makeOrder(){
            this.openOrderModal = true
        },
        noOrderClose(){
            this.openOrderModal = false
        },
        async closeModal(data){
            this.openOrderModal = false;
            this.useAlert('success', 'Order created')
              
            try{
                const orderData = {
                    uid:localStorage.getItem('uid'),
                    name:this.userData.name,
                    positions:data,
                    id:this.id,
                    shopName:this.shopName
                }
                await this.$store.dispatch('postOrder', orderData)
            }catch(error){
                this.useAlert('error', error.message)
                
            }
            this.$router.replace(`/active-orders`)
        }
    },
    async mounted(){
        document.title = 'Order'
        this.choosenCity = 'choose'
        this.choosenShop = 'choose'
        
        try{
            await this.$store.dispatch('getCoffeeShops')
            
        }catch(error){
            console.log(error)
            
        }
    }
}
</script>