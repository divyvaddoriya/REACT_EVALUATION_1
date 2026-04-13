import React, { useState } from 'react'

// time limit = 3 : 30

type Tag = {
    data : string
}

const Tags = () => {

    const [tags , setTags] = useState<Tag[]>([])
   
    const [currTag , setCurrTag] = useState<string>("")
   
    const [error , setError] = useState("")
    
    const handleKeyDown = (e) => {
        if(e.key === " "){
        setTags((prev) => { 
            const find = prev?.find((tag) => tag.data == currTag.trim())
        if(find){
            setCurrTag("")
            setError("it exist") 
            return [...prev]
        }else if(currTag.trim() ==""){
            setError("cant add empty")
            return [...prev]
        }
        else if(tags.length == 10 ) {
            setError("limit reached can only add 10 tags")
            return [...prev]
        }else{
            setCurrTag("")
        }
        setError("")
        return [...prev , {data: currTag.trim()}]})
        }
    }

    const handleChange = (e) => {
        setError("")
        setCurrTag(e.target.value)
    }

    const handleRemove = (data) => {
        setError("")
        setTags((prev)=>prev.filter((tag) => tag.data != data))
    }
  return (
    <div>
        <input type="text" disabled={tags?.length == 10 ? true : false} value={currTag} onChange={handleChange} onKeyDown={handleKeyDown}  />
<div style={{display:"flex" , alignItems:"center" , gap:"10px"}}>

        {tags?.map((tag) => {
            return <div style={{color: "black" ,width:"50px", backgroundColor:"white", height: "50px", border:"1px solid white"}} key={tag.data}>
                {tag.data}
                <button style={{background:"white",width:"15px",display:"flex" , alignContent:"center" , height:"15px", color:"red"}}  onClick={() => handleRemove(tag.data)}>X</button>
            </div>
        })}
        </div>

       
{error && <div style={{color:"red"}}>{error}</div> }
        
    </div>
  )
}

export default Tags