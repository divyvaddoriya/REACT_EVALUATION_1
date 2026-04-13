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
            
            setError("it exist") 
            return [...prev]
        }
        else if(tags.length == 10 ) {
            setError("limit reached can only add 10 tags")
            return [...prev]
        }else{

            setError("")
            setCurrTag("")
        }
        return [...prev , {data: currTag.trim()}]})
        }
    }

    const handleChange = (e) => {
        setError("")
        setCurrTag(e.target.value)
    }

    const handleRemove = (data) => {
        setTags((prev)=>prev.filter((tag) => tag.data != data))
    }
  return (
    <div>
        <input type="text" disabled={tags?.length == 10 ? true : false} value={currTag} onChange={handleChange} onKeyDown={handleKeyDown}  />

        {tags?.map((tag) => {
            return <div key={tag.data}>
                {tag.data}
                <button onClick={() => handleRemove(tag.data)}>X</button>
            </div>
        })}

        {error != "" &&
<div style={{color:"red"}}>{error}</div> 
        }

    </div>
  )
}

export default Tags