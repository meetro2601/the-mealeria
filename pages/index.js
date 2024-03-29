// Root file (Default Route file)

import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import MealCard from "../components/MealCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/AuthContext";


export default function Home(props) {
  
  const router = useRouter();
  const {loading,favMeals} = useAuth()
  const [meals, setmeals] = useState(props.mealData)
  const [searchWord, setsearchWord] = useState("");

  useEffect(() => {
      setmeals(props.mealData)
  }, [props.mealData])
  

  useEffect(() => {
    console.log(favMeals)
    const list = props.mealData.map((item,index)=>{
      favMeals.map(meal =>{
        if(meal.idMeal == item.idMeal){
          item.favorite = true
          return item
        }
      })
      return item
    })
    setmeals(list)
  }, [favMeals,props.mealData])
  


  const changeHandler = (e) => {
    setsearchWord(e.target.value);
    if (e.target.value) {
      router.push(`/?search=${e.target.value}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <>
      <Header></Header>
      {loading ? <LinearProgress></LinearProgress> : null}
      <div style={{paddingTop:'135px'}} className="text-center container">
        <Input
          type="text"
          placeholder="Search Meal"
          endAdornment={
            <InputAdornment position="end">
              <IconButton className="p-0">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          value={searchWord}
          onChange={changeHandler}
        ></Input>
        <Row className="my-5">
          {meals.length != 0 ? (
            meals.map((item, index) => {
              return (
                <Col className="mb-4 text-center" lg={3} md={4} xs={6} key={index}>
                  <MealCard meal={item}></MealCard>
                </Col>
              );
            })
          ) : (
            <p className="fs-5 fw-bold text-center">No Meal Found</p>
          )}
        </Row>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const query = context.query.search ? context.query.search : "";
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await res.json();
  if(data.meals == null){
    return {props:{mealData:[]}}
  }
  data.meals?.map(item => item.favorite = false)

  return {
    props: {
      mealData: data.meals,
    },
  };
}
