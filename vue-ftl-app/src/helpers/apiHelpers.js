import axios from 'axios'

/*
function dataFilter (data, type) {
  if (data === '') return null
  return data
}
*/

export function getAsync (url) {
/* await axios.get({
    method: 'GET',
    url: url,
    dataType: 'json',
    dataFilter: dataFilter,
});
*/
  return axios.get(url)
  //TODO add security here (if returned type is not a )
}

export function getMDAsync (url) {
  /* await axios.get({
      method: 'GET',
      url: url,
      dataType: 'json',
      dataFilter: dataFilter,
  });
  */
    return axios.get(url,{responseType: 'text',})
  }

export function putAsync (url, data) {
  /* await axios.get({
      method: 'GET',
      url: url,
      dataType: 'json',
      dataFilter: dataFilter,
  });
  */
    return axios.put(url,data)
}