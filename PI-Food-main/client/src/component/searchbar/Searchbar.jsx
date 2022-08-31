import React from "react";
import { useState  } from "react";
import { getRecipeByName } from "../../action/action";
import { useDispatch } from "react-redux";



export default function Searchbar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");


  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSubmit(e){
    try{
      dispatch(getRecipeByName(search));
    } catch(error){
      console.log(error)
    }
  }



  return (
    <div className="searchbar">
      <input 
            value={search}
            type="text" 
            placeholder="Search" 
            onChange={handleChange}
            />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}