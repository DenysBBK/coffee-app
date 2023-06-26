<template>
    <div class='container max-w-5xl mx-auto flex flex-col  gap-y-10'>
        
            <div class='sm:flex-row flex-col flex justify-between gap-x-5 gap-y-5'>
                <img src="../../images/queue.jpg" class='h-1/3 w-2/3 m-auto lg:h-2/3 lg:w-1/3 md:h-2/3 md:w-2/3'>
                <p class='text-center bg-yellow-50 p-3 text-lg rounded-lg m-auto cover box-content inline-block border border-black'>
                    Do you like to drink coffee very much, but are you already tired of constant queues?</p>
            </div>
            <div class='sm:flex-row flex-col-reverse flex justify-between gap-x-5 gap-y-5'>
                <p class='text-center bg-yellow-50 p-3 text-lg rounded-lg m-auto cover box-content inline-block border border-black'>
                    Would you like your coffee to be prepared as you walk to the coffee shop so that when you arrive, you can pick up your coffee and continue on your way?</p>
                    <img src="../../images/queue.jpg" class='h-1/3 w-2/3 m-auto lg:h-2/3 lg:w-1/3'>
            </div>
            <div class='sm:flex-row flex-col flex justify-between gap-x-5 gap-y-5'>
                <img src="../../images/queue.jpg" class='h-1/3 w-2/3 m-auto lg:h-2/3 lg:w-1/3'>
                <p class='text-left bg-yellow-50 p-3 text-lg rounded-lg m-auto cover box-content inline-block border border-black'>
                    All you need to do is 4 simple things:
                    <br><router-link to="/registration" class="text-blue-500">1. Register</router-link>
                    <br>2. Find a coffee shop along the way
                    <br>3. Order coffee
                    <br>4. Pick up a drink on the way when it is ready
                </p>
            </div>
            <div class='sm:flex-row flex-col-reverse flex justify-between gap-x-5 gap-y-5'>
                <p class='text-center bg-yellow-50 p-3 text-lg rounded-lg m-auto cover box-content inline-block border border-black'>
                    Enjoy your favorite coffee that you now have without queuing!</p>
                    <img src="../../images/queue.jpg" class='h-1/3 w-2/3 m-auto lg:h-2/3 lg:w-1/3'>
            </div>


        

    </div>
</template>
<script lang="ts">
export default{
    mounted(){
        document.title = 'Main'
    }
}
</script>