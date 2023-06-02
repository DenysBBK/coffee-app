<template>
    <div class='container mx-auto max-w-lg px-2' >
        <form class='flex flex-col items-center border-2 border-black rounded-lg p-2 bg-yellow-50' 
        @submit.prevent="submitForm">
            <p class='font-bold text-xl'>Registration</p>
            <div class="flex pt-6">
            <button class='rounded-full bg-white border-2 border-gray py-2 px-5 
             hover:text-white hover:bg-yellow-400 mr-5' type="button" mode="flat" :class="{'bg-yellow-400 text-white':role=='users'}"
             @click.stop="swithToUser">Client</button>
            <button class='rounded-full bg-white border-2 border-gray py-2 px-5 
             hover:text-white hover:bg-yellow-400 ml-5' :class="{'bg-yellow-400 text-white':role=='shops'}" type="button" mode="flat"
             @click.stop="swithToShop">Cafe</button>
            </div>
            <base-alert :show="showAlert" :alertType="typeOfAlert" @close="closeAlert" >
            <p>{{ alertText }}</p>
            </base-alert>
            <base-spinner :showSpinner="isLoading"></base-spinner> 
            <div v-if="role == 'shops'" class='flex flex-col pt-10'>
                <label for="shop" class='text-center'>Cafe name</label>
                <input type="text" id="shop" v-model.trim="coffeeShopName" class='mt-2 pl-1 rounded-md' >
            </div>
            <div v-if="role == 'users'" class='flex flex-col pt-10'>
                <label for="name" class='text-center'>Your name</label>
                <input type="text" id="name" v-model.trim="userName" class='mt-2 pl-1 rounded-md'>
            </div>
            <div class='flex flex-col pt-3'>
                <label for="email" class='text-center'>Email</label>
                <input type="email" id="email" v-model.trim="email" class='mt-2 pl-1 rounded-md'>
            </div>
            <div class='flex flex-col pt-3 ml-6'>
                <label for="password" class='text-center'>Password</label>
                <div class="flex gap-x-2">
                    <input v-if="!isPassOpen" type="password" id="password" v-model.trim="password" class='mt-2 pl-1 rounded-md'>
                    <img @click="swithBtnPassVis" v-if="!isPassOpen" src = '../../images/eye-open.png' class='max-w-50 max-h-5 self-end'>
                    <input v-if="isPassOpen" type="text" id="password" v-model.trim="password" class='mt-2 pl-1 rounded-md'>
                    <img @click="swithBtnPassVis" v-if="isPassOpen" src = '../../images/eye-closed.png' class='max-w-50 max-h-5 self-end'>
                </div>
            </div>
            <div class='flex flex-col pt-3 ml-6'>
                <label for="confirm" class='text-center'>Confirm password</label>
                <div class="flex gap-x-2">
                    <input v-if="!isPassConfOpen" type="password" id="confirm" v-model.trim="confirmPassword" class='mt-2 pl-1 rounded-md'>
                    <img @click="swithBtnPassConfVis" v-if="!isPassConfOpen" src = '../../images/eye-open.png' class='max-w-50 max-h-5 self-end'>
                    <input v-if="isPassConfOpen" type="text" id="confirm" v-model.trim="confirmPassword" class='mt-2 pl-1 rounded-md'>
                    <img @click="swithBtnPassConfVis" v-if="isPassConfOpen" src = '../../images/eye-closed.png' class='max-w-50 max-h-5 self-end'>
                </div>
            </div>
            <div class='pt-5 flex mx-20'>
                <input type="checkbox" id="confirmTerms" v-model="checkedTerms" class='ml-10'>
                <p class='pl-4'>
                    I agree to <router-link to="/terms" class='text-blue-600' target="_blank" rel="noopener noreferrer">Terms of Service</router-link>
                     and <router-link to="/privacy-policy" class='text-blue-600' target="_blank" rel="noopener noreferrer">Privacy Policy</router-link> 
            </p>
            <p class='text-red-600' v-if="termsValidator">You need to agree with terms</p>
            </div>
            <button @click="submitForm" class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5
             hover:text-white hover:bg-yellow-400 ' type="button" mode="flat"
             >Registration</button>
             <span class='mt-5'>Already have an account?<router-link to="/login" class='text-blue-600'> Login</router-link></span>
            
        </form>
    </div>
</template>
<script>
import alertMixin from './mixins/alert.js'

export default{
    mixins:[alertMixin],
    data(){
        return{
            role:'users',
            userName:'',
            coffeeShopName:'',
            email:'',
            password:'',
            confirmPassword:'',
            checkedTerms:false,
            isLoading:false,
            isPassOpen:false,
            isPassConfOpen:false,
            termsValidator:false

        }
    },
    methods:{
        async submitForm(){
            if(!this.checkedTerms){
                this.termsValidator = true
                return
            }
            this.isLoading = true
            const actionPayload = {
                email:this.email,
                password:this.password,
                type:this.role,
                name:this.role === 'users'? this.userName:this.coffeeShopName
            }
            try{
                await this.$store.dispatch('signup', actionPayload)
                await this.useAlert('success', 'Successful registration')
            }catch(err){
               await this.useAlert('error', err.message )
            }
            this.isLoading = false
           this.userName = '';
           this.email = '';
           this.password = '';
           this.confirmPassword = '';
           this.coffeeShopName = '';
           this.checkedTerms = false
        },
        swithToUser(){
            this.role = 'users' 
            console.log(this.role)
        },
        swithToShop(){
            this.role = 'shops'
            console.log(this.role) 
        },
        swithBtnPassVis(){
            this.isPassOpen = !this.isPassOpen
        },
        swithBtnPassConfVis(){
            this.isPassConfOpen = !this.isPassConfOpen
        }
    },
    mounted(){
        document.title = 'Registration'
    }
}
</script>
<style>
.choosen{
    background-color: yellow;
}
</style>