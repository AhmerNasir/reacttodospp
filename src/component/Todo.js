import React, { useState,useEffect } from 'react'
import todo from '../images/todo.svg'
import '../App.css';

// to get data from local storage
const getLocalItems =()=>{
    let list = localStorage.getItem('lists');
    console.log(list);
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return [];
    }
}

const Todo = () => {

    const [InputData,setInputData] = useState();
    const [items,setItems] = useState(getLocalItems());
    const [toggleBtn,setToggleBtn] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);


    const addItem = () => {
        if(!InputData){
alert('plzz fill the fields');
        }else if(InputData && !toggleBtn){
            setItems(
                items.map((elem) => {
                    if(elem.id === isEditItem){
                        return {...elem,name:InputData}
                    }
                    return elem;
                })
            )
            setToggleBtn(true);
            setInputData('')
            setIsEditItem(null);
        }
        else {
    const allInputData = {id : new Date().getTime().toString(), name: InputData}
      setItems([...items,allInputData]);
      setInputData('');
        }
    }

const deleteItem =(index)=>{
    // console.log(id);
    const updatedItem = items.filter((elem) => {
           return index !=elem.id;
    });
     setItems(updatedItem);
    
}
const editItem =(id) =>{
    let newEditItem = items.find((elem) =>{
        return elem.id === id;
    });
    console.log(newEditItem);
    setToggleBtn(false);
    setInputData(newEditItem.name)
    setIsEditItem(id);
}

const deleteAll =()=>{
    // console.log(id);

    setItems([])
    
}
//   add data to localstorage

  useEffect(() => {
      localStorage.setItem('lists', JSON.stringify(items))
  }, [items]);

    return (
        <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src={todo} alt='todo-logo' ></img>
                <figcaption>Add your List Here</figcaption>
            </figure>
            <div className='addItems'>
                <input type="text" placeholder='😍 Add items' value={InputData} 
                onChange={(e) => setInputData(e.target.value)}/>

                {
                    toggleBtn ? <i class="fa fa-plus add-btn" aria-hidden="true" title='Add Item'
                     onClick={addItem}></i>:
                    <i class="fa fa-edit add-btn" aria-hidden="true" title='Update Item' onClick={addItem}></i>
                }
                
            </div>
            <div className='showItems'>

            {
                items.map((elem) =>  {
                   return(
                <div className='eachItem' key={elem.id}>
                <h3>{elem.name}</h3>
<div className='todo-btn' >
                <i class="fa fa-edit add-btn" aria-hidden="true" title='Edit Item' onClick={() =>editItem(elem.id)}></i>
                <i class="fa fa-trash add-btn" aria-hidden="true" title='Delete Item' onClick={() =>deleteItem(elem.id)}></i>
                </div>  
                </div>
 
                   )
                })
            }
            
            </div>

            <button className='btn effect04' data-sm-link-text ="Remove All" onClick={deleteAll}><span> Check List</span></button>
        </div>
            
        </div>
    )
}

export default Todo;
