import axios from 'axios';

const basePatch = 'https://tmthan.com/wp-json/wp/v2/';

export default {
  getCategories(cb) {
    axios
      .get(`${basePatch}categories?sort=name&hide_empty=true&per_page=50`)
      .then(response => {
        cb(response.data.filter(c => c.name !== 'Uncategorized'));
      })
      .catch(e => {
        cb(e);
      });
  },

  getPages(cb) {
    axios
      .get(`${basePatch}pages?per_page=10`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  getPage(id, cb) {
    if(!Number.isInteger(id) || !id)
      return false;

    axios
      .get(`${basePatch}pages/${id}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  getPosts(limit = 6, cb) {
    axios
      .get(`${basePatch}posts?per_page=${limit}`)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },
};
