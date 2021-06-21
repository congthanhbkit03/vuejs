<template>
<div>
  <p v-currency>Hello</p>
  <br>Max char directive
  <input type="text" v-maxchars="10" name="" id="">
  <br>Number
  <input type="text" v-custext.type="'number'">

  <br>Position Integer
  <input type="text" v-custext.type="'positioninteger'" name="" id="">

  <br>currency
  <input type="text" v-custext.type="'currency'" name="" id="">

</div>
</template>

<script>
export default {

}
</script>

<style>

</style>