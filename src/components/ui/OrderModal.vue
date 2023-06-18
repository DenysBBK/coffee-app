<template>
    <teleport to="body">
        <transition name="dialog">
            <div class="fixed flex-col pt-40 items-center top-0 left-0 h-screen w-screen bg-black bg-opacity-75 z-10 " v-if="show">
                <div v-if="show" class='container mx-auto max-w-lg px-2' >
                    <div class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
                    <slot></slot>
                  <p>fsdsdf</p>
                  <p>fsdsdf</p>
                  <p>fsdsdf</p>
                  <p>fsdsdf</p>
                    <button type="button" @click="closeModal">✖️</button>
                    </div>
                </div>
                </div>
        </transition>
    </teleport>
</template>
<script>    
export default{
    props:{
        show:{
            required:true,
            type:Boolean
        },
    },
    emits: ['close'],
    methods:{
        closeModal(){
            this.$emit('close')
        }
    }
}
</script>
<style scoped>
  
  /* dialog {
    position: fixed;
    top: 20vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: white;
  } */
  .dialog-enter-from,
  .dialog-leave-to{
    opacity: 0;
    transform: scale(0.8);
  }
  .dialog-enter-active{
    transition: all 0.3s ease-out;
  }
  .dialog-leave-active{
    transition: all 0.3s ease-in;
  }


  .dialog-enter-to,
  .doalog-leave-from{
    opacity: 1;
    transform: scale(1);
  }
</style>