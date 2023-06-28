<template>
    <div class='container mx-auto max-w-lg px-2' > 
        <base-alert :show="showAlert" :alertType="typeOfAlert" >
            <p>{{ alertText }}</p>
            </base-alert>
            <base-spinner :showSpinner="isLoading"></base-spinner>  
        <form class='flex flex-col items-center border-2 border-black rounded-lg p-2 bg-yellow-50' 
        @submit.prevent="submitForm">
            <p class='font-bold text-xl'>Login</p>
            <div class='flex flex-col pt-3'>
                <label for="email" class='text-center'>Email</label>
                <input type="email" id="email"  class='mt-2' v-model.trim="email">
                <p class="text-red-600 text-xs" v-if="isEmailValid">Email must be not empty</p>
            </div>
            <div class='flex flex-col pt-3'>
                <label for="password" class='text-center'>Password</label>
                <div class="flex gap-x-2 pl-7">
                    <input v-if="!isPassOpen" type="text" id="password"  class='mt-2' v-model.trim="password">
                    <img @click="swithBtnPassVis" v-if="!isPassOpen" src = '../../images/eye-open.png' class='max-w-50 max-h-5 self-end'>
                    <input type="password" id="password"  class='mt-2' v-model.trim="password" v-if="isPassOpen">
                    <img @click="swithBtnPassVis" v-if="isPassOpen" src = '../../images/eye-closed.png' class='max-w-50 max-h-5 self-end'>
                </div>
                <p class="text-red-600 text-xs" v-if="isPasswordValid">Password must be not empty</p>
            </div>
            <div>
            <div class='pt-5'>
                <input type="checkbox" id="shop" v-model="toShopAccount">
                <label for="shop" class='pl-2'>To cafe account</label>
            </div>
            <div>
                <input type="checkbox" id="user" v-model="toUserAccount">
                <label for="user" class='pl-2'>To user account</label>
            </div>
        </div>
        <span v-if="checkValidator" class='text-red-500 pt-2 text-xs'>Need to choose one option</span>
            <button @click="submitForm" class='rounded-full bg-white border-2 border-gray py-2 px-5 mt-5 center
             hover:text-white hover:bg-yellow-400 ' type="button" mode="flat"
             >Login</button>
             <span class='mt-5'>Don`t have account?<router-link to="/registration" class='text-blue-600'> Registration</router-link></span>
        </form>
        </div>
</template>
<script>
import alertMixin from '../components/mixins/alert.js'
export default{
    mixins:[alertMixin],
    data(){
        return{
            email:'',
            password:'',
            toUserAccount:false,
            toShopAccount:false,
            checkValidator:false,
            isShow: false,
            isLoading:false,
            isEmailValid:false,
            isPasswordValid:false,
            isPassOpen:false,  
        }
    },
    methods:{
        async submitForm(){
            if(this.email === '' && this.password === '' && !this.toShopAccount && !this.toUserAccount){
                this.isEmailValid = true;
                this.isPasswordValid = true;
                this.checkValidator = true;
                return
            }
            if(this.email === ''){ this.isEmailValid = true; 
                return};
            if(this.password === ''){this.isPasswordValid = true; 
                return};
            if(!this.toShopAccount && !this.toUserAccount){
                this.checkValidator = true;
                return
            };
            if(this.toShopAccount && this.toUserAccount){
                this.checkValidator = true;
                return
            }
            const actionPayload = {
                email:this.email,
                password:this.password,
                type: this.toUserAccount ? 'users' : 'shops'
            }
            try{
                this.isLoading = true
                await this.$store.dispatch('signIn', actionPayload);    
                console.log(this.uid)
                this.useAlert('success', 'Succesful login')
                setTimeout(() => {
                    this.isLoading = false
                    actionPayload.type === 'users' ? this.$router.replace(`/user-profile`) : this.$router.replace(`/cafe-profile`)    
                }, 2000);
                
                // actionPayload.type === 'users' ? this.$router.replace(`/user-profile`) : this.$router.replace(`/cafe-profile/${this.uid}`) 
            }catch(error){
                this.isLoading = false
                this.useAlert('error', error.message)
                
            }
            this.email = '';
            this.password = '';
            this.toShopAccount = false;
            this.toUserAccount = false
        },
        swithBtnPassVis(){
            this.isPassOpen = !this.isPassOpen
        },
    },
    computed:{
            uid(){
                return this.$store.getters.uid
            },
           //сделать доступным к нажатию только один чек-бокс
        // isOneProperty(){
        //     if(this.toShopAccount && this.toUserAccount){
        //         this.checkValidator = true
        //         return true
        //     }else{
        //         this.checkValidator = false
        //         return false
        //     }
            
        
        //     }
        },
        mounted(){
            document.title = 'Login'
            console.log('Login')
            
        },
    }
    

</script>