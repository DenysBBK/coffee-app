<template>
    <div class='container mx-auto max-w-xl px-2'>
        <base-alert :show="showAlert" :alertType="typeOfAlert" >
            <p>{{ alertText }}</p>
        </base-alert>
            <form class='border-2 border-black rounded-lg p-10 bg-yellow-50'
            @submit.prevent="saveChanges" v-if="!profileUpdated">
                <div class="flex pb-10 flex-col gap-y-3">
                        <label for="photo"><b>Add cafe logo</b></label>
                        <input type="file" id="photo">
                        <label for="city"><b>Enter city</b></label>
                        <input class="w-1/2 pl-1" type="text" id="city" v-model.trim="cafeCity" >  
                        <label for="place"><b>Enter Address</b></label>
                        <input class="w-1/2 pl-1" type="text" id="place" v-model.trim="cafeAddress">
                        <label for="phone"><b>Contact Phone</b></label>
                        <input class="w-1/2 pl-1" type="text" id="phone" v-model.trim="phone">
                        <div>
                            <button type="button" @click="addPosition"><b>Add position</b> ➕</button>
                            <div class="flex gap-x-2 pb-2" v-for="(item, index) in positions" :key="index">
                                <label :for="'pos'+index"><b>Item</b></label>
                                <input type="text" :id="'pos'+index" class="pl-1" v-model="item.name">
                                <label :for="'price'+index"><b>Price</b></label>
                                <input class="w-10 pl-1" type="text" :id="'price'+index" v-model="item.price">
                                <button type="button" @click="deletePosition(index)">✖️</button>
                            </div>
                        </div>
                </div>
                <div class="flex justify-center">
                    <button @click="saveChanges" type="button"
                     class='rounded-full bg-white border-2 border-gray py-2 px-5 
                     hover:text-white hover:bg-yellow-400'
                    >Save</button>
                </div>
            </form>
            <div v-if="profileUpdated" class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
                <div class="flex flex-col gap-y-5">
                    <div class="avatar rounded-full flex items-center justify-center">
                        <img class="avatar__image" src="../../images/photo.jpg" />
                    </div>
                    <div>
                        <p><b>Cafe name:</b> {{ name }}</p>
                        <p><b>City:</b> {{ cafeCity }}</p>
                        <p><b>Address:</b> {{ cafeAddress }}</p>
                        <p><b>Contact phone:</b> {{ phone }}</p>
                    </div>
                    <p><b>Available positions:</b></p>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in positions" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ item.price }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex justify-center">
                    <button @click="updateProfile" type="button"
                    class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5 center
                    hover:text-white hover:bg-yellow-400 '>Update profile
                    </button>
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
            name:'Aroma',
            cafeAddress:'',
            cafeCity:'',
            phone:'',
            positions:[{
                name:'',
                price:''
            }],
            profileUpdated:false
        }
    },
    methods:{
        addPosition(){
            this.positions.push({
                name:'',
                price:''
            })
        },
        deletePosition(index){       
            this.positions.splice(index, 1)  
        },
        async saveChanges(){
            const formData = {
                city:this.cafeCity,
                address:this.cafeAddress,
                phone:this.phone,
                positions:this.positions,
                orders:[]
            }
            try{
                await this.$store.dispatch('postCafe', formData);
            }catch(error){
                console.log(error)
                
            };
            this.profileUpdated = true;
            this.useAlert('success', 'Changes saved') 
        },
        updateProfile(){
            this.profileUpdated = false
        },
    },
    computed:{
        getCafeData(){
            return this.$store.getters.cafe
        }
    },
    async mounted(){
        document.title = 'Profile'
        
        try{
            await this.$store.dispatch('getCafeData');
            this.profileUpdated = true
        }catch(error){
            this.useAlert('error', error.message)
        }
        this.phone = this.getCafeData.phone,
        // this.positions = this.getCafeData.positions,
        this.name = this.getCafeData.name,
        this.cafeAddress = this.getCafeData.address,
        this.cafeCity = this.getCafeData.city
        if(this.getCafeData.positions){
            this.positions = this.getCafeData.positions
        } else{
            this.positions = []
        }
        
    },
}
</script>
<style scoped>

</style>