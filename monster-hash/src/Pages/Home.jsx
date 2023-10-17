import React from 'react'
import SearchInput from '../Components/SearchInput'
import ElDivider from '../Components/ElDivider'
import CardList from '../Components/CardList'
import DropdownList from '../Components/DropdownList'

export default function Home() {
  return (
    <div>
        <h1>Search Cards</h1>
        <SearchInput />
        <DropdownList />
        <ElDivider />
        <CardList />
    </div>
  )
}
