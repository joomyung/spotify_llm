// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDoSL8Qwz_19FKsQ0XnXP-TDKKbGn_prngWtd8EzaWM3_4qEb6om6BR3LKEOpYLFlt6O5r8vInrZyFJE0dCAYbYUIx3VC0pGE_EqKM-lvrkmlvdpp2sf6WxHDXfHbCfBhqq-LyEsJ3XAirOqVCa6AmOlIhJKMVbAgIVYz0a6UG3wrvZjO5bEHui6IES5Ti84U3jotdkEQzkXRcZNq006lh893ASWjYSnKNweW1qji6g0jJD841tZbQD4UbyWhLZ';
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

const tracksUri = [
  'spotify:track:210JJAa9nJOgNa0YNrsT5g','spotify:track:2HRgqmZQC0MC7GeNuDIXHN','spotify:track:6uTPA1xlcsk6dbchB2dhzl','spotify:track:7n6L2QVQ0eDqXUVRZ8qpY8','spotify:track:6ezYHltHYhuJckdCsYsRJI','spotify:track:7mYwDmbbp8UPLlnRjTJ54X','spotify:track:0ZPjVmof45INEERgYfadtv','spotify:track:2wVDWtLKXunswWecARNILj','spotify:track:0pHylQR53epYtRcVIhUSCh','spotify:track:0dcnrLo8s1rhjm8euGjI4n'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
