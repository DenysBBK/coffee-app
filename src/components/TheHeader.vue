<template>
<header class=' w-full px-10 mx-auto bg-green-600'>
    <nav class='container px-6 py-4 mx-auto md:flex md:justify-between md:items-center'>
        <div class='flex items-center justify-between'>
            <div class='flex gap-x-1'>
        <img src="../../images/coffee-cup.png" class="max-w-100 max-h-10 object-contain">
            <p class='text-black font-bold bg-white rounded py-2 px-3 text-center  '>
            <router-link to="/">Take and go</router-link></p>
        </div>
        <div @click="showMenu = !showMenu" class="flex md:hidden">
              <button type="button" class=" text-yellow-500 hover:text-yellow-500 focus:outline-none focus:text-yellow-500">
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
        </div>
        <ul :class="showMenu ? 'flex' : 'hidden'"
            class=" flex-col mt-8  items-end md:flex  md:flex-row md:items-end gap-x-3 gap-y-2 md:mt-0">
            <router-link :to="profilePath">
                <li class='rounded-full bg-yellow-200 py-2 px-3 text-center
             hover:text-white hover:bg-yellow-400' v-if="isUserLoggedIn">Profile</li>
            </router-link>
            <router-link to="/active-orders">
                <li class='rounded-full bg-yellow-200 py-2 px-3 text-center
             hover:text-white hover:bg-yellow-400' v-if="userType == 'users'">History</li>
            </router-link>
            <router-link :to="orderPath">
                <li class='rounded-full bg-yellow-200 py-2 px-3 text-center
             hover:text-white hover:bg-yellow-400' v-if="isUserLoggedIn">Orders</li>
            </router-link>
            <router-link to="/login" v-if="!isUserLoggedIn">
                <li class='rounded-full bg-yellow-200 py-2 px-3 text-center
                hover:text-white hover:bg-yellow-400'>
                Login
                </li>
            </router-link>
            <router-link to="/registration" v-if="!isUserLoggedIn">
                <li class='rounded-full bg-yellow-200 py-2 px-3 text-center
                hover:text-white hover:bg-yellow-400'>
                Registration
                </li>
            </router-link>
            <button @click="logout" v-if="isUserLoggedIn">
                <li class='rounded-full bg-yellow-200 py-2 px-3 text-center
                hover:text-white hover:bg-yellow-400'>
                Logout
                </li>
            </button>
        </ul>
    </nav>
</header>
</template>
<script>
export default{
    data(){
        return{
            showMenu: false,
        }
    },
    methods:{
        logout(){
            
            this.$router.replace('/login')
            this.$store.dispatch('logout')
            
        }
    },
    computed:{
    isUserLoggedIn(){
      return this.$store.getters.isUserAuthenticated
      console.log(this.$store.getters.isUserAuthenticated) 
    },
    orderPath(){
        const orderType = this.userType == 'users' ? `/user-profile/${this.theId}/orders` : `/cafe-profile/${this.theId}/orders`
        return orderType
    },
    profilePath(){
        const profileType = this.userType == 'users' ? `/user-profile/${this.theId}` : `/cafe-profile/${this.theId}`
        return profileType
    },
    userType(){
        return this.$store.getters.type
    },
    theId(){
        return this.$store.getters.uid
    }
    }
}

</script>
