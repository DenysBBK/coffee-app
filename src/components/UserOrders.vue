<template>
    <div class='container mx-auto max-w-2xl px-2'>
        <div class='border-2 border-black rounded-lg p-10 bg-yellow-50'>
            <div class="flex flex-col gap-y-5">
                <div class="flex gap-x-5">
                    <p>Choose the city</p>
                    <select>
                        <option>Choose</option>
                        <option>Brovary</option>
                        <option>Kyiw</option>
                        <option>Lviv</option>
                    </select>
                </div>
                <div class="flex gap-x-5">
                    <p>Choose the coffee-shop</p>
                    <select>
                        <option>Aroma</option>
                        <option>2 zerna</option>
                        <option>New cava</option>
                    </select>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return:{
            
        }
    }
}
</script>