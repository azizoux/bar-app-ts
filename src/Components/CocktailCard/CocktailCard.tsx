import React, { useContext, useState } from "react";
import { ICocktail } from "../../models/Cocktail";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CocktailContext } from "../../App";
import "./CocktailCard.sass";

interface ICocktailCard {
  cocktail: ICocktail;
  openForm: Function;
}

export default function CocktailCard(props: ICocktailCard): JSX.Element {
  const [cocktails, setCocktails] =
    useContext<[ICocktail[], Function]>(CocktailContext);

  const handleLiked = (cktl: ICocktail) => {
    const newCocktails = [...cocktails];
    const indexCocktail = cocktails.findIndex(
      (cocktail) => cocktail.name === cktl.name
    );
    const newCocktail = cocktails[indexCocktail];
    newCocktail.liked = !newCocktail.liked;
    newCocktails.splice(indexCocktail, 1, newCocktail);
    setCocktails(newCocktails);
  };

  return (
    <div className="cocktailCardContainer" style={{ position: "relative" }}>
      <FavoriteIcon
        style={{ position: "absolute", right: "10px" }}
        color={props.cocktail.liked === true ? "primary" : "disabled"}
        className="favoriteIcon"
        onClick={() => handleLiked(props.cocktail)}
      />

      <div
        className="cocktailCard"
        onClick={() => props.openForm(props.cocktail)}
      >
        <img
          className="cocktailImage"
          src={props.cocktail.image}
          alt="CocktailImage"
        />
        <h1 className="cocktailName">{props.cocktail.name}</h1>
        <div className="separator" />
        <div>
          <ol className="ingredientList">
            {props.cocktail.ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
