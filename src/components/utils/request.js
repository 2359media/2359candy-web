async function request(url) {
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
           refreshToken: localStorage.getItem('refreshToken')
          }),
        }
      )
        if(response.status===200){
          const data = await res.json();
            localStorage.setItem('idToken', data.idToken)
            localStorage.setItem('refreshToken',data.refreshToken)
            return request(url)       }
        }
    else if (res.status === 200){
      return res.json()
    } 
  
}
export default request