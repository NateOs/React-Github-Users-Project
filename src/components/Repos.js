import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = useGlobalContext()

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item 
    if (!language) return total
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count
      }
    }
    return total
  }, {})

  console.log(languages)
  //* converting to array and sorting array, slice cuts off the array
  const mostUsed = Object.values(languages).sort((a, b) => 
    (b.value - a.value)).slice(0, 5) 

  const mostPopular = Object.values(languages).sort((a, b) => 
    (b.stars - a.stars)).map((item) => {
      //* replacing 'value' with stars, since that's what the table is waiting for
      return {...item, value: item.stars} 
    }).slice(0,5)
    console.log(mostPopular)

  const chartData = [
    {
      "label": "HTML",
      "value": "13"
    },
    {
      "label": "CSS",
      "value": "23"
    },
    {
      "label": "JS",
      "value": "80"
    },
    
  ]

  return (
    <section>
      <Wrapper>
        <Pie3D data={mostUsed}/>
        <Doughnut2D data={mostPopular}/>
        <Column3D data={chartData}/>
        <Bar3D data={chartData}/>
      </Wrapper>     
    </section>)
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
