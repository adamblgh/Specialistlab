import mysql from "mysql";
import { configDB } from "../configDB.js";
const db=mysql.createConnection(configDB)

/*export const specialistlab=(request,response)=>{
    db.query('SELECT * FROM specialistlab ORDER BY users',(err,result)=>{
        if(err){
            console.log('HIBA!',err)
        }
        else{
            response.send(result)
        }
    })
}*/

export const getUsers=(request,response)=>{
    db.query('SELECT * from users ORDER BY username',(error,results)=>{
        if(error){
            console.log('Hiba!',error)
        }
        else{
            response.send(results)
        }
    })
}
export const addUser=(request,response)=>{
    const {username} = request.body
    db.query('INSERT INTO users (username) VALUES (?)',[username],(error, results)=>{
        if (error)
            console.log(error)
        else 
            response.send(results)
    })
}
export const delUser=(request,response)=>{
    const {id} = request.params
    db.query('delete from users where id=?',[id],(error, results)=>{
        if (error)
            console.log(error)
        else 
            response.send(results)
    })
}

export const updateUser=(request,response)=>{
    const {id,role} = request.body
    db.query('update users set role=? where id=?',[role,id],(error, results)=>{
        if (error)
            console.log(error)
        else 
            response.send(results)
    })
}
