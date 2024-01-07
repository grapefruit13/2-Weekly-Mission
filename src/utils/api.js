import axios from "axios";

axios.defaults.baseURL = "https://bootcamp-api.codeit.kr/api";

export async function getData(url) {
  try {
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (e) {
    console.log(`getData에서 ${e} 발생`);
  }
}
