const BASE_URL = process.env.VUE_APP_BASE_URL

export default (axios) => ({
    getAll(_params = {}){
        return axios.get(`${BASE_URL}/get_memes`, {_params:_params})
        .then(
            res => {
                return res;
            },
            err => {
                return err;
            }
        );
    },

    createNewImage(_params){
        return axios.post('', _params).then(
            res => {
                t
            }
        )
    }
})