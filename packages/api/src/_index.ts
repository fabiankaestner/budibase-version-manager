import got from 'got'


const baseURL = 'http://localhost:10000/api'

async function exec() {



  let form = {
    name: 'createdbyapi',
    useTemplate: false
  }

  const create_resp = await got.post({
    url: `${baseURL}/applications`,
    form,
    headers: {
      'cookie': getCookieHeader({})
    }
  })

  console.log(create_resp)
}

exec()