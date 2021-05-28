var axios = require('axios');


class ApiWrapper { 

    async createResource(data) {
        try {
            let res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
            var response = res.data;
            return response.id;
        } catch (err) {
            console.log(err)
        }

    }
};

exports.ApiWrapper = ApiWrapper;