import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = useGlobalContext()

  //* iterating over data object for values (stars and language count)
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

  //* most used language
  //* converting to array and sorting array, slice cuts off the array
  const mostUsed = Object.values(languages).sort((a, b) => 
    (b.value - a.value)).slice(0, 5) 

  //* most stars per language
  const mostPopular = Object.values(languages).sort((a, b) => 
    (b.stars - a.stars)).map((item) => {
      //* replacing 'value' with stars, since that's what the table is waiting for
      return {...item, value: item.stars} 
    }).slice(0,5)
    // console.log(mostPopular)

  //* getting stars and forks
  let {stars, forks} = repos.reduce((total, item) => {
    const { stargazers_count, name, forks} = item
    total.stars[stargazers_count] = {label: name, value: stargazers_count}
    total.forks[forks] = {label: name, value: forks}
    return total
  }, {
    stars:{}, forks: {}
  })
  
  //* conv to arrays, slice and reverse for order
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

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
        <div>
          <Pie3D data={mostUsed}/>
        </div>
        <div>
          <Doughnut2D data={mostPopular}/>
        </div>
        <div>
          <Column3D data={stars}/>
        </div>
        <div>
          <Bar3D data={forks}/>
        </div>
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
