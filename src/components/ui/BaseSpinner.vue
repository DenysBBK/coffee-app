<template>
    <teleport to="main">
    <div v-if="showSpinner" class='flex  absolute justify-center overflow-hidden items-center w-full top-40  '>
        <div class="custom-loader"></div>
    </div>
</teleport>
</template>
<script lang="ts">
export default{
    props:{
        showSpinner:{
            type:Boolean,
            required:true
        }
    }
}
</script>
<style scoped >
.custom-loader {
  width:50px;
  height:50px;
  border-radius:50%;
  border:8px solid;
  border-color:#E4E4ED;
  border-right-color: #1cfc03;
  animation:s2 1s infinite linear;
  display: inline-block;
  background: yellow;
    width: 80px;
    height: 80px;
}
@keyframes s2 {to{transform: rotate(1turn)}}
</style>