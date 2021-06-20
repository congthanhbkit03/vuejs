<template>
  <div>iamge work</div>
</template>

<script>
export default {
    data(){
        return {
            currentParams: null
        }
        
    },
    created() {
        console.log(this.$router)
        this.currentParams = this.$router.currentRoute.params;
    }
}
</script>

<style>

</style>