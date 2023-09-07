import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const AddForm = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        if(!name || !description){
            alert('Please fill out name and description')
            return
        }

        const body = {
            name,
            description,
            imgUrl
        }

        await axios.post(`/item`, body)
            .then(res => {
                if(res.data.code !== 400){
                    dispatch({type: 'SET_SHOW', payload: 'items'})
                }else{
                    alert(res.data.message)
                }
            })


    }

  return (
    <div>
        <p>Add Item</p>
        <form>
            <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input placeholder='Image URL' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
            <button onClick={submitHandler}>Submit</button>
        </form>
    </div>
  )
}

export default AddForm