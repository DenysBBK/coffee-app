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
                <input @blur="clearValidator('coffeeShopName')" type="text" id="shop" v-model.trim="coffeeShopName.value" class='mt-2 pl-1 rounded-md' >
                <p class="text-red-600 text-xs" v-if="!coffeeShopName.isValid">Name must be not empty</p>
            </div>
            <div v-if="role == 'users'" class='flex flex-col pt-10'>
                <label for="name" class='text-center'>Your name</label>
                <input @blur="clearValidator('userName')" type="text" id="name" v-model.trim="userName.value" class='mt-2 pl-1 rounded-md'>
                <p class="text-red-600 text-xs" v-if="!userName.isValid">Name must be not empty</p>
            </div>
            <div class='flex flex-col pt-3'>
                <label for="email" class='text-center'>Email</label>
                <input @blur="clearValidator('email')" type="email" id="email" v-model.trim="email.value" class='mt-2 pl-1 rounded-md'>
                <p class="text-red-600 text-xs" v-if="!email.isValid">Email must be not empty</p>
            </div>
            <div class='flex flex-col pt-3 ml-6'>
                <label for="password" class='text-center'>Password</label>
                <div class="flex gap-x-2">
                    <input @blur="clearValidator('password')" v-if="!isPassOpen" type="password" id="password" v-model.trim="password.value" class='mt-2 pl-1 rounded-md'>
                    <img @click="swithBtnPassVis" v-if="!isPassOpen" src = '../../images/eye-open.png' class='max-w-50 max-h-5 self-end'>
                    <input @blur="clearValidator('password')" v-if="isPassOpen" type="text" id="password" v-model.trim="password.value" class='mt-2 pl-1 rounded-md'>
                    <img @click="swithBtnPassVis" v-if="isPassOpen" src = '../../images/eye-closed.png' class='max-w-50 max-h-5 self-end'>
                </div>
                <p class="text-red-600 text-xs" v-if="!password.isValid">At least 6 characters</p>
            </div>
            <div class='flex flex-col pt-3 ml-6'>
                <label for="confirm" class='text-center'>Confirm password</label>
                <div class="flex gap-x-2">
                    <input @blur="clearValidator('confirmPassword')" v-if="!isPassConfOpen" type="password" id="confirm" v-model.trim="confirmPassword.value" class='mt-2 pl-1 rounded-md'>
                    <img @click="swithBtnPassConfVis" v-if="!isPassConfOpen" src = '../../images/eye-open.png' class='max-w-50 max-h-5 self-end'>
                    <input @blur="clearValidator('confirmPassword')" v-if="isPassConfOpen" type="text" id="confirm" v-model.trim="confirmPassword.value" class='mt-2 pl-1 rounded-md'>
                    <img @click="swithBtnPassConfVis" v-if="isPassConfOpen" src = '../../images/eye-closed.png' class='max-w-50 max-h-5 self-end'>
                </div>
                <p class="text-red-600 text-xs" v-if="!confirmPassword.isValid">Field should match Password</p>
            </div>
            <div class='pt-5 flex mx-20'>
                <input type="checkbox" id="confirmTerms" v-model="checkedTerms" class='ml-10'>
                <p class='pl-4'>
                    I agree to <router-link to="/terms" class='text-blue-600' target="_blank" rel="noopener noreferrer">Terms of Service</router-link>
                     and <router-link to="/privacy-policy" class='text-blue-600' target="_blank" rel="noopener noreferrer">Privacy Policy</router-link> 
            </p>
        </div>
        <p class='text-red-600 text-xs' v-if="termsValidator">You need to agree with terms</p>
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
            userName:{
                value:'',
                isValid:true
            },
            coffeeShopName:{
                value:'',
                isValid:true
            },
            email:{
                value:'',
                isValid:true
            },
            password:{
                value:'',
                isValid:true
            },
            confirmPassword:{
                value:'',
                isValid:true
            },
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
            };
           if(this.userName.value === '' && this.role === 'users'){
                this.userName.isValid = false;
                return
           }
           if(this.coffeeShopName.value === '' && this.role !== 'users'){
            this.coffeeShopName.isValid = false
            return
           }
           if(this.email.value === ''){
            this.email.isValid = false;
            return
           }
           if(this.password.value.length < 6){
            this.password.isValid = false;
            return
           }
           if(this.password.value !== this.confirmPassword.value){
            this.confirmPassword.isValid = false;
            return
           }
            this.isLoading = true
            const actionPayload = {
                email:this.email.value,
                password:this.password.value,
                type:this.role,
                name:this.role === 'users'? this.userName.value:this.coffeeShopName.value
            }
            try{
                await this.$store.dispatch('signup', actionPayload)
                this.useAlert('success', 'Successful registration')
            }catch(err){
               this.useAlert('error', err.message )
            }
            this.isLoading = false
           this.userName.value = '';
           this.email.value = '';
           this.password.value = '';
           this.confirmPassword.value = '';
           this.coffeeShopName.value = '';
           this.checkedTerms = false
           this.userName.isValid = true
           this.email.isValid = true
           this.confirmPassword.isValid = true
           this.coffeeShopName.isValid = true
           
        },
        swithToUser(){
            this.role = 'users' 
        },
        swithToShop(){
            this.role = 'shops'
        },
        swithBtnPassVis(){
            this.isPassOpen = !this.isPassOpen
        },
        swithBtnPassConfVis(){
            this.isPassConfOpen = !this.isPassConfOpen
        },
        clearValidator(input){
            this[input].isValid = true
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