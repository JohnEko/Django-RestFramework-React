import { rejects } from "assert";
import { resolve } from "path";
import { json } from "stream/consumers";


const apiService ={

    get: async function (url: string): Promise<any>{
        console.log('get', url);

        return new Promise((resolve, rejects) => {
            // THIS IS THE BACKEND URI FOR THE API FILE
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) =>{
                    console.log('Response:', json)

                    resolve(json)
                })
                .catch((error) => {
                    rejects(error)
                })
        })
        
    },
    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data)
        return new Promise((resolve, rejects) => {
            // THIS IS THE BACKEND URI FOR THE API FILE
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) =>{
                    console.log('Response:', json)

                    resolve(json)
                })
                .catch((error) => {
                    rejects(error)
                })
        })
        
        
    }


}
export default apiService