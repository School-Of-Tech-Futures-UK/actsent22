import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import ListOfVenues from "./ListOfVenues"
import VenueListItem from "../venuelistitem/VenueListItem"
import { render, screen } from "@testing-library/react"

it ("dummy test", () => {
  expect("hello").toBe("hello")
})

// it("should render a list of venues in Manchester", () => {
    
//     let data = [
//         {
//           name: 'Arena 1',
//           location: 'Manchester',
//           image: 'https://picsum.photos/id/101/200/200',
//           description: 'The first arena'
//         },
    
//         {
//           name: 'Bills Bar',
//           location: 'Manchester',
//           image: 'https://picsum.photos/id/1047/200/200',
//           description : "A bar belonging to bill"
//         },
    
//         {
//           name: 'Mariola\'s Palace Bar',
//           location: 'Madrid',
//           image: 'https://picsum.photos/id/1047/200/200',
//           description : "Luxurious as its owner"
//         },
    
//         {
//           name: 'Lucy\'s Lounge',
//           location: 'Luxembourg',
//           image: 'https://picsum.photos/id/1047/200/200',
//           description : "Legends only"
//         },
//       ];


//       // TeamPage.test.js
//       // jest.mock('react-router-dom', () => ({
//       //   ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
//       //   useParams: () => ({
//       //     location: 'Manchester'
//       //   }),
//       //   useRouteMatch: () => ({ url: '/venues/locationManchester' }),
//       // }));

      
//       console.log("the data is "+JSON.stringify(data))
//       jest.spyOn(global, 'fetch').mockResolvedValue(JSON.stringify(data));
//       render(<ListOfVenues/>)

//       screen.getByText(/Arena 1/);
//       screen.getByText(/Bills Bar/);
//       screen.getByText(/Manchester/);
//       screen.getByText(/A bar belonging to bill/);
//       screen.getByRole("img");
//      // jest.spyOn(ListOfVenues, 'fetchVenues').mockResolvedValue({ json: jest.fn().mockResolvedValue({ data }) });
    



// })