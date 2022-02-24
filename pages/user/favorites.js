import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../../components/Header";
import MealCard from "../../components/MealCard";
import { useAuth } from "../../components/AuthContext";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function FavMeals() {
  const router = useRouter();

  const { loading, favMeals } = useAuth();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/user/login");
      }
    });
  }, [auth,router]);

  return (
    <>
      <Header></Header>
      {loading ? <CircularProgress></CircularProgress> : null}
      <div className="container py-5">
      {(favMeals.length !== 0) ? (
        <>
          <h3 className="mt-5 pt-5">My Favorites</h3>
          <Row className="my-5">
            {favMeals.map((item, index) => {
              return (
                <Col className="mb-4 text-center" lg={3} md={4} xs={6} key={index}>
                  <MealCard meal={item}></MealCard>
                </Col>
              );
            })} 
          </Row>
            </>
      ) : (
        <p className="fs-5 mt-5 py-5 fw-bold text-center">No Meal Found</p>
        )}
        </div>
    </>
  );
}
