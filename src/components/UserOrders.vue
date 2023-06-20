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
        @close="closeModal">
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
                        <p><b>Cafe name:</b> {{ this.shopName }}</p>
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
            console.log('Make an order')
            this.openOrderModal = true
        },
        async closeModal(data){
            this.openOrderModal = false;
            this.useAlert('success', 'Order created')
            console.log(this.id)
            
            try{
                const orderData = {
                    uid:localStorage.getItem('uid'),
                    name:this.userData.name,
                    positions:data,
                    id:this.id
                }
                await this.$store.dispatch('postOrder', orderData)
            }catch(error){
                console.log(error)
                
            }
            
            
            
            

            let id = localStorage.getItem('uid');
            this.$router.replace(`/user-profile/${id}/history`)
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