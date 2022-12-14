import React,{useState} from "react";
import { useMutation } from "react-query";
import {useNavigate} from "react-router-dom";
import { checkUsername,checkEmail,register } from "./getData";
import {Form,FormGroup,Input,Label,FormFeedback,Button,FormText} from "reactstrap";
import { validate } from 'react-email-validator';
 
export const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [name,setName] = useState("")
    const [isValidU, setIsValidU] = useState(null)
    const [isValidP, setIsValidP] = useState(null)
    const [isValidE, setIsValidE] = useState(null)
    const [isValidN,setIsValidN] = useState(null)
    const [success,setSuccess] = useState(null)
    const [msg,setMsg] = useState("")
 
    const mutationCheckUsername=useMutation(checkUsername,{
      onSuccess:(data)=>{
        console.log(data.data.rowCount,data.data.username)
        if(data.data.rowCount==0)
          setIsValidU(true)
        else
          setIsValidU(false)
      }
    })
 
    const handleCheckUsername = () =>{
      if(username)
        mutationCheckUsername.mutate({username:username})
      else
        setIsValidU(false)
    }
 
    const handleCheckEmail = () =>{
      if(validate(email))
        mutationCheckEmail.mutate({email:email})
      else{
        setIsValidE(false)
      }
    }
 
    const mutationCheckEmail=useMutation(checkEmail,{
      onSuccess:(data)=>{
        console.log(data.data.rowCount,data.data.email)
        if(data.data.rowCount==0)
          setIsValidE(true)
        else
          setIsValidE(false)
      }
    })
 
    const handleCheckPassword = () =>{
      password.length<6 ? setIsValidP(false) : setIsValidP(true)
    }
 
    const handleCheckName = () =>{
        if(name.length>0){
          setIsValidN(true)
        }
        else{
          setIsValidN(false)
        }
      }
 
    const mutationRegister=useMutation(register,{
      onSuccess:(data)=>{
        if(data.data?.id){
          setSuccess(true)
          setUsername('')
          setEmail('')
          setPassword('')
          setName('')
          setIsValidU(null)
          setIsValidE(null)
          setIsValidP(null)
          setIsValidN(null)
        }
        else{
          setSuccess(false)
        }
        setMsg(data.data.msg)
      }
      })
 
 
 
  return (
    <Form className="border p-3 shadow mt-1 rounded text-center">
        <h3>Regisztr??ci??</h3>
 
        <FormGroup>
        <Label for="username">N??v</Label>
        <Input id="name" className={isValidN==null ? "" : (isValidN ? "is-valid" : "is-invalid")}
            autoFocus
            value={name} onChange={(e)=>setName(e.target.value)}
            onBlur={handleCheckName}
            onKeyPress={(e)=>e.key=='Enter' ? document.getElementById('username').focus() : ''}
        />
        <FormFeedback>N??v kit??lt??se k??telez??!</FormFeedback>
      </FormGroup>
 
      <FormGroup>
        <Label for="username">Felhaszn??l??n??v</Label>
        <Input id="username" className={isValidU==null ? "" : (isValidU ? "is-valid" : "is-invalid")}
            value={username} onChange={(e)=>setUsername(e.target.value)}
            onBlur={handleCheckUsername}
            onKeyPress={(e)=>e.key=='Enter' ? document.getElementById('email').focus() : ''}
        />
        <FormFeedback>Felhaszn??l??n??v m??r l??tezik!</FormFeedback>
      </FormGroup>
 
      <FormGroup>
        <Label for="email">Email</Label>
        <Input id="email" type="email" className={isValidE==null ? "" : (isValidE ? "is-valid" : "is-invalid")}
            value={email} onChange={(e)=>setEmail(e.target.value)}
            onBlur={handleCheckEmail}
            onKeyPress={(e)=>e.key=='Enter' ? document.getElementById('password').focus() : ''}
 
        />
        <FormFeedback >Email-c??m m??r haszn??latban van!/Helytelen email-c??m!</FormFeedback>
        <FormText>Email-c??mnek tartalmaznia kell egy @-ot!</FormText>
      </FormGroup>
 
      <FormGroup>
        <Label for="password">Jelsz??</Label>
        <Input id="password" type="password" className={isValidP==null ? "" : (isValidP ? "is-valid" : "is-invalid")}
            value={password} onChange={(e)=>setPassword(e.target.value)}
            onBlur={handleCheckPassword}
 
        />
        <FormFeedback>Helytelen jelsz??!</FormFeedback>
        <FormText>A jelsz??nak legal??bb 6 karakter hossz??s??g??nak kell lennie!</FormText>
      </FormGroup>
 
 
 
      <div>
        <Input type="button" className="btn btn-dark" 
        disabled={!isValidU || !isValidE || !isValidP}
        onClick={()=>mutationRegister.mutate({name:name,username:username,email:email,password:password})}
        value="Regisztr??lok"/>
      </div>
      <div className="msg">{msg}</div>
      {success && <div className="btn btn-outline-dark mt-2"
      onClick={()=>navigate('/login')}
      >Jelentkezz be</div>}
    </Form>
  );
};