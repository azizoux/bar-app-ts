import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./CocktailForm.sass";
import { ICocktail } from "../../models/Cocktail";
import bandeau from "../../assets/images/bandeau.jpg";
import { CocktailContext } from "../../App";

interface ICocktailForm {
  cocktail: ICocktail | undefined;
  closeModal: Function;
}

export default function CocktailForm(props: ICocktailForm) {
  const [cocktails, setCocktails] =
    useContext<[ICocktail[], Function]>(CocktailContext);
  const [ingredients, setIngredients] = useState<string[]>(
    props.cocktail !== undefined ? props.cocktail.ingredients : []
  );
  const changeIngredient = (ingredient: string, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = ingredient;
    setIngredients(newIngredients);
  };

  const validerCocktail = () => {
    const newCocktails = [...cocktails];
    let cocktailIndex = 0;
    const cocktailToChange = cocktails.find((cocktail, index) => {
      cocktailIndex = index;
      return props.cocktail ? cocktail.name === props.cocktail.name : false;
    });
    if (cocktailToChange !== undefined) {
      cocktailToChange.ingredients = ingredients;
      newCocktails[cocktailIndex] = cocktailToChange;
      setCocktails(newCocktails);
    }
    props.closeModal(undefined);
  };

  return (
    <div className="cocktailForm">
      <div className="cocktailName">
        {props.cocktail !== undefined ? props.cocktail.name : ""}
      </div>
      <div className="cocktailFormImages">
        <img
          className="cocktailImage"
          src={props.cocktail !== undefined ? props.cocktail.image : ""}
          alt=""
        />
        <img className="bandeau" src={bandeau} alt="bandeau" />
      </div>
      <div className="cocktailFormIngredients">
        {props.cocktail !== undefined
          ? props.cocktail.ingredients.map(
              (ingredient: string, index: number) => {
                return (
                  <TextField
                    id={ingredient}
                    key={ingredient}
                    label="Ingredient"
                    variant="outlined"
                    value={ingredients[index]}
                    style={{ marginTop: "10px" }}
                    onChange={(e) => changeIngredient(e.target.value, index)}
                  />
                );
              }
            )
          : null}
      </div>
      <div className="formButton">
        <Button variant="outlined" onClick={() => props.closeModal(undefined)}>
          ANNULER
        </Button>
        <Button variant="contained" onClick={() => validerCocktail()}>
          VALIDER
        </Button>
      </div>
    </div>
  );
}
