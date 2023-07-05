<template>
<the-header></the-header>
<main>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component" class="component"></component>
    </transition>
  </router-view>
</main>
<the-footer></the-footer>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
export default{
  components:{
    TheHeader,
    TheFooter,
  },
  data(){
    return{
      name:'Toliamba',
      surename:'sadsadsad'
    }
  },
  created(){
    this.$store.dispatch('loginFromStorage')
    
    
  },
}
</script>
<style>
html,
body{
  height: 100%;
}
body{
  background-image: url('../images/coffee-bean.png');
  background-position: center;
  
}
main{
  padding-top: 70px;
  padding-bottom: 20px;
  flex: 1 1 auto;
  position: relative;
}
.component{
  padding: 0 15px;
}
.route-enter-from{
  opacity: 0;
  transform: translateX(-30px);
}
.route-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
.route-enter-active{
  transition: all 0.3s ease-out;
}
.route-leave-active{
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from{
  opacity: 1;
  transform: translateX(0);
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


</style>
