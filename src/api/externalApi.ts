export class ExternalApi{
    
    async fetchCourses():Promise<string[]>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(['MERN','MEAN','FULLSTACK'])
            },1000)
        })
    }
}