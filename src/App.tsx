import React, { createContext, useState } from "react";
import Modal from "react-modal";
import CocktailCard from "./Components/CocktailCard/CocktailCard";
import "./App.sass";
import { CocktailList } from "./models/CocktailList";
import { ICocktail } from "./models/Cocktail";
import NavBar from "./Components/NavBar/NavBar";
import CocktailForm from "./Components/CocktailForm/CocktailForm";

const data: ICocktail[] = CocktailList();

export const CocktailContext = createContext<[ICocktail[], Function]>([
  data,
  () => {},
]);

function App() {
  const [cocktails, setCocktails] = useState<ICocktail[]>(data);
  const [cocktailOpen, setCocktailOpen] = useState<ICocktail | undefined>(
    undefined
  );

  const handleSearch = (critere: string): void => {
    console.log(critere);
    if (critere.trim() === "") {
      setCocktails(data);
    } else {
      setCocktails(
        data.filter((cocktail) =>
          cocktail.name.toLowerCase().startsWith(critere.toLowerCase())
        )
      );
    }
  };

  const handleFavorite = (checked: boolean) => {
    if (checked === true) {
      setCocktails(data.filter((cocktail) => cocktail.liked === true));
    } else {
      setCocktails(data);
    }
  };

  return (
    <CocktailContext.Provider value={[cocktails, setCocktails]}>
      <div className="App">
        <NavBar filter={handleSearch} favorite={handleFavorite} />
        {cocktails.map((cocktail) => (
          <CocktailCard cocktail={cocktail} openForm={setCocktailOpen} />
        ))}
        <div className="modal">
          <Modal
            className="ModalStyle"
            isOpen={cocktailOpen !== undefined}
            onRequestClose={() => setCocktailOpen(undefined)}
          >
            <CocktailForm
              cocktail={cocktailOpen}
              closeModal={setCocktailOpen}
            />
          </Modal>
        </div>
      </div>
    </CocktailContext.Provider>
  );
}

export default App;
