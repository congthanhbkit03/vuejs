<template>
  <div class="home">
    Home work
    <p>{{onProgress ? "Dang doi API" : "Da load xong API" }}</p>
    <p>Hien nay dang co {{listImage ? listImage.length : 0}} anh </p>
    <Pagination :pagination="pagination" :handle-change-page="handleChangePage" :handle-change-per-page="handleChangPerPage" />
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
import Pagination from '@/components/Shared/Pagination'
export default {
  components: { Pagination },
  data(){
    return {
      allImages: null,
      // listImage: null,
      onProgress: false,
      pagination: {
        count: 100,
        current_page: 1,
        per_page: 10,
        totals: 0,
        total_pages: 10
      }
    }
  },
  computed: {
    listImage(){
      // return [...this.allImages.slice]
      if (this.allImages !== null)
        return this.allImages.slice((this.pagination.current_page - 1) * this.pagination.per_page, this.pagination.current_page * this.pagination.per_page)
      else
        return null
    }
  },
  created(){
    // console.log(process.env.VUE_APP_BASE_URL);
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
      // this.listImage = response.data.data.memes;
      this.allImages = response.data.data.memes;
    },

    handleNavi(_url){
      this.$router.push(_url);
    },
    
    handleChangePage(_val){
      console.log(this.listImage);
      this.pagination = {
        ...this.pagination,     //copy pagination hien tai lai: de ko phai lay default ban dau cac gia tri totals, total_pages...., dung ... de render lai view
        current_page: _val,
      }

    },
    //ham thay doi so luong ban ghi trong 1 page
    handleChangPerPage(_val){
        let new_total_pages = Math.ceil(this.pagination.count / _val)
        this.pagination = {
            ...this.pagination,
            per_page: _val,
            current_page: 1, //khi change per_page value => dua ve dau trang cho khoi loi
            total_pages: new_total_pages
        }
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
