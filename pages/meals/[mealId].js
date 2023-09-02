// For Route @ domain/about/"any dynamic value"

import { useRouter } from "next/router";
import { notFound } from 'next/navigation'
import { Col, Row } from "react-bootstrap";

export default function Detail(props) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="container py-md-5 my-5 text-center">Loading....</div>
    );
  }

  const mealDetail = props.mealInfo.meals[0];
  const ingredients = [
    mealDetail.strIngredient1,
    mealDetail.strIngredient2,
    mealDetail.strIngredient3,
    mealDetail.strIngredient4,
    mealDetail.strIngredient5,
    mealDetail.strIngredient6,
    mealDetail.strIngredient7,
    mealDetail.strIngredient8,
    mealDetail.strIngredient9,
    mealDetail.strIngredient10,
    mealDetail.strIngredient11,
    mealDetail.strIngredient12,
    mealDetail.strIngredient13,
    mealDetail.strIngredient14,
    mealDetail.strIngredient15,
    mealDetail.strIngredient16,
    mealDetail.strIngredient17,
    mealDetail.strIngredient18,
    mealDetail.strIngredient19,
    mealDetail.strIngredient20,
  ];

  return (
    <div className="container py-md-5 my-5">
      <div className="mb-5 text-center text-md-start">
        <h2 className="fw-bold mb-3">{mealDetail.strMeal}</h2>
        <p className="mb-2">
          <b>
            <i>Category: </i>
          </b>
          {mealDetail.strCategory}
        </p>
        <p className="mb-2">
          <b>
            <i>Area: </i>
          </b>
          {mealDetail.strArea}
        </p>
      </div>
      <Row>
        <Col md={6} className="text-center mb-5 order-md-2">
          <img
            className="w-75"
            alt={mealDetail.strMeal}
            src={mealDetail.strMealThumb}
          ></img>
        </Col>
        <Col md={6} className="order-md-1">
          <h6 className="fw-bold text-center text-md-start">
            <i>Ingredients: </i>
          </h6>
          <p
            style={{ textAlign: "justify" }}
            className="text-center text-md-start"
          >
            {ingredients.map((ingdt, index) => {
              if (index === 0) {
                return ingdt;
              } else if (ingdt) {
                return ", " + ingdt;
              }
            })}
            .
          </p>
          <h6 className="fw-bold mt-4 text-center text-md-start">
            <i>Instructions: </i>
          </h6>
          <p style={{ textAlign: "justify" }} className="pb-3">
            {mealDetail.strInstructions}
          </p>
          <p>
            To watch a video, <a href={mealDetail.strYoutube}>Click here</a>.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: { mealId: "52785" },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${context.params.mealId}`
  );
  const data = await res.json();

  if(data.meals == null){
    return {notFound:true}
  }

  return {
    props: {
      mealInfo: data,
    },
  };
}
