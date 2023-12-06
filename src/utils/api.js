const BASE_URL = "https://bootcamp-api.codeit.kr/api";

export async function getData(url) {
  const response = await fetch(`${BASE_URL}/${url}`);
  if (!response.ok) {
    throw new Error(
      `${BASE_URL}/${url}에서 데이터를 받아오는 데 실패했습니다.`
    );
  }
  const result = await response.json();
  return result;
}
