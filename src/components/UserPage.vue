<template>
    <div class='container mx-auto max-w-xl px-2'>
            <base-alert :show="showAlert" :alertType="typeOfAlert" >
                <p>{{ alertText }}</p>
            </base-alert>
        <!-- <transition name="profile" mode="out-in"> -->
        <form class='border-2 border-black rounded-lg p-10 bg-yellow-50 '
        @submit.prevent="saveChanges" v-if="!profileUpdated">
            <div class="flex pb-10 flex-col sm:flex-row">
                <div>
                    <label for="photo">Add your photo</label>
                    <input type="file" id="photo">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" class="pl-1" v-model.trim="phone">
                    <label for="bank">Choose you bank</label>
                    <select id="bank" v-model="bank">
                        <option value="choose">Choose</option>
                        <option value="Monobank">Monobank</option>
                        <option value="PrivatBank">PrivatBank</option>
                        <option value="Oshad">Oshad Bank</option>
                        <option value="Pumb">Pumb</option>
                    </select>
                    <label for="card">Card number</label>
                    <input type="text" id="card" class="pl-1" v-model="cardNumber">
                </div> 
            </div>
            <div class="flex justify-center">
            <button @click="saveChanges" type="button"
            class='rounded-full bg-white border-2 border-gray py-2 px-5 
                hover:text-white hover:bg-yellow-400'
                >Save</button>
            </div>
        </form>
<!-- </transition>
<transition name="profile" mode="in-out"> -->
    <div v-if="profileUpdated" class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
        <div class="flex flex-col gap-y-5">
                <div class="avatar rounded-full flex items-center justify-center">
                    <img class="avatar__image" src="../../images/photo.jpg" />
                </div>
                <div>
                    <p><b>Name:</b> {{ name }}</p>
                    <p><b>Phone number:</b> {{ phone }}</p>
                    <p><b>Bank:</b> {{ bank }}</p>
                    <p><b>Card Number:</b> {{ cardNumber === ''? '': this.cardNumber.slice(0, -8) + "********" }}</p>
                </div>
        </div>
        <div class="flex justify-center">
            <button @click="updateProfile" type="button"
        class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5 center
        hover:text-white hover:bg-yellow-400 '>Update profile
            </button>
        </div>  
        <div class="flex place-content-around">
            <router-link to="/active-orders">
                <button class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5 center
             hover:text-white hover:bg-yellow-400'>Active orders &#x2192</button>
            </router-link>
            <router-link :to="userOrders">
                <button class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5 center
             hover:text-white hover:bg-yellow-400'>Make order &#x2192</button>
            </router-link>
        </div>
        
    </div>
<!-- </transition> -->
</div>

</template>
<script>
import alertMixin from '../components/mixins/alert.js'
export default{
    mixins:[alertMixin],
    
    data(){
        return{
            name:'',
            phone:'',
            bank:'choose',
            cardNumber:'',
            profileUpdated:false,
            

        }
    },
    methods:{
        updateProfile(){
            this.profileUpdated = false
            
        },
        async saveChanges(){
            const formData = {
                phone:this.phone,
                bank:this.bank,
                card:this.cardNumber
            }
            try{
                await this.$store.dispatch('postUser', formData)
            }catch(error){
                console.log(error)
                
            }
            this.profileUpdated = true
            this.useAlert('success', 'Changes saved')
        },

    },
    computed:{
        userOrders(){
                return `/order`
        },
        getUserData(){
            return this.$store.getters.user
        }
    },
    async mounted(){
        document.title = 'Profile'
        try{
            await  this.$store.dispatch('getUserData')
        if(this.getUserData.bank == '' && this.getUserData.card == '' && this.getUserData.phone == ''){
            this.profileUpdated = false
        } else if(!this.getUserData.bank && !this.getUserData.card && !this.getUserData.phone){
            this.profileUpdated = false
        } else{
            this.name = this.getUserData.name;
            this.bank = this.getUserData.bank;
            this.cardNumber = this.getUserData.card;
            this.phone = this.getUserData.phone;
            this.profileUpdated = true
        }
        

        }catch(error){
            this.useAlert('error', error.message)
        }
        
    },
    
}
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.profile-enter-from{
  opacity: 0;
  transform: translateX(30px);
}
.profile-leave-to{
  opacity: 0;
  transform: translateX(-30px);
}
.profile-enter-active{
  transition: all 0.3s ease-out;
}
.profile-leave-active{
  transition: all 0.3s ease-in;
}
.profile-enter-to,
.profile-leave-from{
  opacity: 1;
  transform: translateX(0);
}




</style>