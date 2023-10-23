import React, { useEffect } from "react";
import _, { set } from "lodash";
import { Dropdown } from "semantic-ui-react";
import CSS from "./dropdown.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filter, filerMyResults } from "../redux/cardsState";
import ToggleBtn from "./ToggleBtn";

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
    "Continuous",
    "Equip",
    "Counter",
    "Continuous",
    "Quick-Play",
    "Field",
    "Normal",
  ];

  const cardTypes = [
    "Tuner Monster",
    "Spell Card",
    "Effect Monster",
    "Trap Card",
    "Synchro Monster",
    "Normal Monster",
    "Ritual Monster",
    "Fusion Monster",
    "XYZ Monster",
    "Flip Effect Monster",
    "Link Monster",
    "Pendulum Effect Monster",
    "Pendulum Normal Monster",
    "Pendulum Tuner Effect Monster",
    "Pendulum Flip Effect Monster",
    "Pendulum Effect Fusion Monster",
    "Pendulum Effect Synchro Monster",
    "Pendulum Effect Xyz Monster",
    "Pendulum Effect Link Monster",
    "Skill Card",
    "Token",
  ];

  const dispatch = useDispatch();

  //get the filtered cards from state
  const filteredCards = useSelector((state) => state.cardsState.filteredCards);
  const searchResults = useSelector((state) => state.cardsState.searchResults);
  const isFiltering = useSelector((state) => state.cardsState.isFiltering);
  const toggleButtons = useSelector((state) => state.cardsState.toggleButtons);
  const [joinedArray, setJoinedArray] = React.useState([]);

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
    //get the name of the removed card or is undefined
    const removed = event.target?.previousSibling?.data;
    const added = event.target?.innerText;

    // merge the two arrays and remove duplicates
    dispatch(filerMyResults({ add: added, del: removed }));
  };

  //menu options for card type
  const handleCardTypeChange = (event) => {
    const removed = event.target?.previousSibling?.data;
    const added = event.target?.innerText;

    // merge the two arrays and remove duplicates
    dispatch(filerMyResults({ add: added, del: removed }));
  };

  //set btn color

  const toggleBtn = (CardType) => {
    console.log("TTT", toggleButtons[CardType]);
    dispatch(
      filerMyResults({
        add: CardType,
        del: toggleButtons[CardType] ? CardType : undefined,
      })
    );
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
          <ToggleBtn
            text={"Trap cards"}
            buttonId={"Trap"}
            clickEvent={() => toggleBtn("trap")}
          />
          <ToggleBtn
            text={"Spell cards"}
            buttonId={"Spell"}
            clickEvent={() => toggleBtn("spell")}
          />
          <ToggleBtn
            text={"Monster cards"}
            buttonId={"Monster"}
            clickEvent={() => toggleBtn("monster")}
          />

          <Dropdown
            placeholder="Monster Type Race & Spell/Trap type"
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
