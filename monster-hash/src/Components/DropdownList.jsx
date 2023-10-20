import React, { useEffect } from "react";
import _, { set } from "lodash";
import { Dropdown } from "semantic-ui-react";
import CSS from "./dropdown.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filter, filerMyResults } from "../redux/cardsState";

export default function DropdownList() {
  const monsterRace = [
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Creator God",
    "Cyberse",
    "Dinosaur",
    "Divine-Beast",
    "Dragon",
    "Fairy",
    "Fiend",
    "Fish",
    "Insect",
    "Machine",
    "Plant",
    "Psychic",
    "Pyro",
    "Reptile",
    "Rock",
    "Sea Serpent",
    "Spellcaster",
    "Thunder",
    "Warrior",
    "Winged Beast",
    "Wyrm",
    "Zombie",
  ];

  const cardTypes = [
    "Spell Card",
    "Trap Card",
    "Normal Monster",
    "Effect Monster",
    "Fusion Monster",
    "Synchro Monster",
    "Xyz Monster",
    "Link Monster",
    "Normal Spell",
    "Continuous Spell",
    "Equip Spell",
    "Field Spell",
    "Quick-Play Spell",
    "Normal Trap",
    "Continuous Trap",
    "Counter Trap",
  ];

  const dispatch = useDispatch();

  //get the filtered cards from state
  const filteredCards = useSelector((state) => state.cardsState.filteredCards);
  const searchResults = useSelector((state) => state.cardsState.searchResults);
  const isFiltering = useSelector((state) => state.cardsState.isFiltering);
  const filterList = useSelector((state) => state.cardsState.filterList);
  

  const [joinedArray, setJoinedArray] = React.useState([]);
  const [raceArray, setRaceArray] = React.useState([]);
  const [cardTypeArray, setCardTypeArray] = React.useState([]);

  // dropdown options for monster types
  const monsterRaceOptions = _.map(monsterRace, (state, index) => ({
    key: monsterRace[index],
    text: state,
    value: monsterRace[index],
  }));

  // dropdown options for card types
  const cardTypesOptions = _.map(cardTypes, (state, index) => ({
    key: cardTypes[index],
    text: state,
    value: cardTypes[index],
  }));

  //MONSTER TYPE
  const handleCardRaceChange = (event) => {
    const removed = event.target?.previousSibling?.data;
    const added = event.target?.innerText;
    dispatch(filerMyResults({ add: added, del: removed })); // merge the two arrays and remove duplicates
  };

  //menu options for card type
  const handleCardTypeChange = (event) => {
    const removed = event.target?.previousSibling?.data;
    const added = event.target?.innerText;
    dispatch(filerMyResults({ add: added, del: removed })); // merge the two arrays and remove duplicates
  };

  return (
    <div>
      <br />
      <p>{joinedArray}</p>
      <p>
        {isFiltering
          ? `Found ${filteredCards.length} cards`
          : `Cards ${searchResults.length}`}
      </p>
      {searchResults.length > 0 ? (
        <>
          <Dropdown
            placeholder="Monster Type / Race"
            fluid
            multiple // allows multiple selections
            search
            selection // allows user to select
            options={monsterRaceOptions}
            onClick={(e) => console.log("e", e)}
            className={CSS.dropdown}
            onChange={handleCardRaceChange}
          />

          <Dropdown
            placeholder="Card Type"
            fluid
            multiple
            search
            selection
            options={cardTypesOptions}
            className={CSS.dropdown}
            onChange={handleCardTypeChange}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
