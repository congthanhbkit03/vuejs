<template>
  <div class="home">
    Home work
    <p>{{onProgress ? "Dang doi API" : "Da load xong API" }}</p>
    <p>Hien nay dang co {{listImage ? listImage.length : 0}} anh </p>
    <h1 class="my-4 font-weight-bold">Masonry - columnWidth</h1>

    <div class="grid">
      <div v-for="img in listImage" class="grid-item" :key="img.id" @click="handleNavi(`image/${img.id}`)">
        <img :src="img.url" width="100%"/>
      </div>
    </div>

  </div>
</template>

<script>
//so sanh created vs mounted: bt ve nha 1
//tim hieu fetchData vs data
// import axios from 'axios';

export default {
  components: {},
  data(){
    return {
      listImage: null,
      onProgress: false
    }
  },
  computed: {

  },
  created(){
    console.log(process.env.VUE_APP_BASE_URL);
    this.getAllImage()
  },
  methods:{
    // 3 cach de thuc hien 1 api trong thuc te
    // C1: goi truc tiep api
    // getAllImage(){
    //   // axios.method.then.catch.finally
    //   // axios.config.then.catch.finally
    //   axios
          // .get(`https://api.imgflip.com/get_memes`)
          // .then(
    //     //neu nhieu then thi then truoc phai return du lieu cho sau
    //     (res)=>{
    //       console.log(res);
    //       this.listImage = res.data.data.memes;
    //     },
    //     (error)=>{
    //       console.log("Loi API");
    //     }
    //   ).catch(
    //     err => {
    //       console.log(err); //de lo co loi o day thi van chay ben duoi dc
    //     }
    //   );
    

    // C2: build han 1 api resository - khuyen dung
    async getAllImage(){
      this.onProgress = false;
      //await phai ket hop voi async de bat dong nay phai thuc hien xong moi chay cac lenh ben duoi
      const response = await this.$api.image.getAll({a:2, b:2});  //do co await nen bat buoc dong nay chay xong moi chay dc cac lenh ben duoi
      console.log(response);
      this.listImage = response.data.data.memes;
    },

    handleNavi(_url){
      this.$router.push(_url);
    }
  }
}
</script>

<style scoped>
/* * { box-sizing: border-box; }

.grid:after {
  content: '';
  display: block;
  clear: both;
}

.grid-sizer,
.grid-item {
  width: 33.333%;
}
@media (max-width: 575px) {
  .grid-sizer,
  .grid-item {
    width: 100%;
  }
}
@media (min-width: 576px) and (max-width: 767px) {
  .grid-sizer,
  .grid-item {
    width: 50%;
  }
}


.grid-item {
  float: left;
}

.grid-item img {
  display: block;
  max-width: 100%;
} */

* { box-sizing: border-box; }

.grid:after {
  content: '';
  display: block;
  clear: both;
}

.grid-item {
  width: 160px;
  height: 120px;
  float: left;
  background: #00997B;
  border: 1px solid #333;
  border-color: hsla(0, 0%, 0%, 0.5);
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
