import axios from "axios";

const baseUrl = "http://localhost:8080/api/transacts";

export async function getTransact(page = 0) {
  return axios.get(`${baseUrl}&size=8&page=${page}`).then((res) => {
    return {
      data: res.data._embedded.transacts,
      maxPage: res.data.page.totalPages,
    };
  });
}

export async function getTransactAsc(page = 0) {
  return axios.get(`${baseUrl}?sort=date&size=8&page=${page}`).then((res) => {
    return {
      data: res.data._embedded.transacts,
      maxPage: res.data.page.totalPages,
    };
  });
}

export async function getTransactDesc(page = 0) {
  return axios
    .get(`${baseUrl}?sort=date,desc&size=8&page=${page}`)
    .then((res) => {
      return {
        data: res.data._embedded.transacts,
        maxPage: res.data.page.totalPages,
      };
    });
}

export async function addTransact(newData) {
  return axios.post(baseUrl, newData).then((res) => res.data);
}

export async function deleteTransact(id) {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
}

export async function updateTransact(id, updatedData) {
  return axios.put(`${baseUrl}/${id}`, updatedData).then((res) => res.data);
}
