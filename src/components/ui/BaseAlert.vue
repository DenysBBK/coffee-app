<template>
    <teleport to="main">
        <transition name="alert">
    <div v-if="show" role="alert" class="flex absolute top-0 overflow-hidden mt-3 mr-3 right-0 bg-teal-100 border-t-4 border-teal-500 rounded-b
     text-black px-4 py-3 shadow-md" :class="{'error':alertType === 'error', 'success':alertType === 'success'}" style="overflow: hidden;">
             <div class="py-1"><svg class="fill-current h-6 w-6 mr-4" :class="{'icon_error':alertType === 'error', 'icon_success':alertType === 'success'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
             <p class="font-bold"><slot></slot></p>
            </div>
            <div>
            <button @click="close" class='ml-3'>x</button>
          </div>
    </div>
    
        </transition>
    </teleport>
    
    </template>
    <script lang="ts">
    export default{
       props:{
        show: {
            type: Boolean,
            required: true,
          },
          alertType:{
            type: String,
            required: false
          },
       },
       methods:{
        close(){
          this.$emit('close')
        }
       }
      

      }
    </script>
    <style>
    
    .alert-enter-active,
    .alert-leave-active {
      transition: all 0.8s ease-in;
    }
    
    .alert-enter,
    .alert-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
    .alert-enter-from{
      opacity: 0;
      transform: translateX(30px);
    }
    .error{
      background-color: white;
      border-color: red;
    }
    .success{
      background-color: white;
      border-color: green
    }
    .icon_error{
      color: red
    }
    .icon_success{
      color: teal
    }
    
    </style>