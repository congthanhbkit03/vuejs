<template>
    <div>
        <ul listcat>
            <li v-for="(cat, idx) in categories" :key="idx" @click="filterCat(cat)">
                {{cat.text}}
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: ["categories", "filterByCat"],
    data(){
        return {

        }
    },
    methods:{
        filterCat(_cat){
            console.log(_cat);
            this.filterByCat(_cat);
            console.log("AAAAAAAAA");
        }
    }
}
</script>

<style scoped>
    ul>li{
        display: inline-block;
        width: 150px;
        height: 20px;
        
    }
    ul>li>a{
        text-decoration: none;
    }
</style>