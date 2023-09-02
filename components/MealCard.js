import { Star, StarOutline } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import {db} from '../firebase/firebaseconfig'
import {doc, getDoc, setDoc, deleteDoc} from 'firebase/firestore'
import { useAuth } from "./AuthContext";

function MealCard({ meal }) {
  
  const {currentUser,badgeCount,setbadgeCount,favMeals,setfavMeals} = useAuth()

  const router = useRouter();
  const {
    idMeal: id,
    strArea: area,
    strCategory: category,
    strMeal: name,
    strMealThumb: image,
    favorite
  } = meal;

  const cardClickHandler = (mealId) => {
    router.push(`/meals/${mealId}`);
  };

  const favoriteHandler = async (meal) => {
    const docRef = await doc(db,currentUser.uid,meal.idMeal)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists() && meal.favorite) {
      meal.favorite = false
      deleteDoc(docRef)
      setbadgeCount(badgeCount-1)
      setfavMeals((prevState)=>{
        return prevState.filter(item => item.idMeal != meal.idMeal)
      })
    }
    // else if(docSnap.exists() && !meal.favorite){
    //   alert('Meal already exists')
    // } 
    else {
      meal.favorite = true
      setDoc(docRef,meal)
      setbadgeCount(badgeCount+1)
      setfavMeals((prevState)=>([...prevState,meal]))
    }
  };

  return (
    <>
      <Card className="position-relative">
        {
          currentUser ?
          <IconButton onClick={()=>favoriteHandler(meal)}>
          {favorite ? <Star color="error"></Star> : <StarOutline></StarOutline>}
        </IconButton> : null
        }
        <CardActionArea onClick={() => cardClickHandler(id)}>
        <CardMedia component="img" image={image}></CardMedia>
          <CardContent style={{ height: "180px" }} className="p-3">
            <h5 className="mb-3">
              <i>Name:</i> {name}
            </h5>
            <p className="mb-2">
              <i>
                <b>Category:</b>
              </i>{" "}
              {category}
            </p>
            <p className="mb-2">
              <i>
                <b>Area:</b>
              </i>{" "}
              {area}
            </p>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default MealCard;
