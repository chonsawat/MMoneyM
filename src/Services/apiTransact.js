import axios from "axios";

const baseUrl = "http://localhost:8080/api/transacts";

export async function getTransact() {
  return axios.get(baseUrl).then((res) => res.data._embedded.transacts);
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
