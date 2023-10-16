import React from 'react'
import SearchInput from '../Components/SearchInput'
import ElDivider from '../Components/ElDivider'
import CardList from '../Components/CardList'

export default function Home() {
  return (
    <div>
        <h1>Search Cards</h1>
        <SearchInput />
        <ElDivider />
        <CardList />
    </div>
  )
}
