// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDOKvzi1CscD5SHW8Nl8a7caZ1byVke98WejDPJgbD5tzaZL_NmgP5wtGgyDq63b78AXXD3i2OOwOWnNPHWa46_jpQqxXZEMhqehy1BJpyh2dyfTUGR7qJAKpAK-z5duewCEQenf0EFc1y7AfDBTx_PO3MKwGrjAFv_5IPkkVFOaM7zcfsYYuwPX0UH82HfT0xnFeqVyUVc7_ENcVFeYr7UG2vChyfuZVGPeGpws3x0pC7moUzbfqz8Z8oQ7ejs';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const topTracksIds = [
  '210JJAa9nJOgNa0YNrsT5g','6uTPA1xlcsk6dbchB2dhzl','6ezYHltHYhuJckdCsYsRJI','0ZPjVmof45INEERgYfadtv','0pHylQR53epYtRcVIhUSCh'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);