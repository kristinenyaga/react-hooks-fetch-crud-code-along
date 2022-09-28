import React, { useState,useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  
  // add useEffect hook
  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then(response => response.json())
    .then(items => setItems(items))
  },[])
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleAddItem(newItem){
    setItems([...items,newItem])

  }

  function handleUpdateItem(updateItem){
    const updatedItems=items.map(item =>{
      if(item.id === updateItem.id){
        return updateItem
      }
      else{
        return item
      }
    })
  setItems(updatedItems)
  }
  function handleDeleteItem(deletedItem){
    const updatedItem=items.filter(item => item.id !==deletedItem.id)
   setItems(updatedItem)
  }
  return (
    <div className="ShoppingList">
      <ItemForm  onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
