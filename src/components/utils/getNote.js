async function request(url,id) {
  const res = await fetch(url,{
    method:'GET',
    headers:{
      'Authorization' : `Bearer ${localStorage.getItem('idToken')}`
    }
  })
    if(res.status === 403){
     const response = await fetch(
       'https://candy-243011.firebaseapp.com/api/v1/refreshIdToken',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
           refresh_token: localStorage.getItem('refreshToken')
          }),
        }
      )
        if(response.status===200){
          const data = await response.json();
            localStorage.setItem('idToken', data.id_token)
            localStorage.setItem('refreshToken',data.refresh_token)
            return request(url,id)       }
        }
    else if (res.status === 200){
      return res.json()
    } 
  
}
export default request