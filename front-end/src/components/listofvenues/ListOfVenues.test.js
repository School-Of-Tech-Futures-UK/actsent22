import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import ListOfVenues from "./ListOfVenues"
import VenueListItem from "../venuelistitem/VenueListItem"
import { render, screen } from "@testing-library/react"

it ("dummy test", () => {
  expect("hello").toBe("hello")
})


let data = [{"venue_id":1,"venue_name":"Birmingham Utilita Arena","venue_capacity":2000,"venue_address":"King Edwards Rd, Birmingham, B1 2AA","venue_geolocation":"52.479938,-1.914905","venue_owner_email":"birmingham@utilita.com","venue_start_date":"2022-02-12T00:00:00.000Z","venue_end_date":"2022-04-12T00:00:00.000Z","venue_image":"https://picsum.photos/id/1047/200/200","venue_description":null},
{"venue_id":2,"venue_name":"Wembley","venue_capacity":80000,"venue_address":"Bridge Road, London, HA9 9AA","venue_geolocation":"51.559043,-0.28166","venue_owner_email":"wembleyevents@wembley.com","venue_start_date":"2020-03-17T00:00:00.000Z","venue_end_date":"2022-05-17T00:00:00.000Z","venue_image":"https://picsum.photos/id/1047/200/200","venue_description":null},
{"venue_id":3,"venue_name":"O2","venue_capacity":100000,"venue_address":"Peninsula Square, London SE10 0DX","venue_geolocation":"51.501823,0.00397","venue_owner_email":"brokenroof@o2.com","venue_start_date":"2022-04-01T00:00:00.000Z","venue_end_date":"2023-01-11T00:00:00.000Z","venue_image":"https://picsum.photos/id/1047/200/200","venue_description":null},
{"venue_id":4,"venue_name":"AON","venue_capacity":20000,"venue_address":"Carrington, Manchester M31 4BH","venue_geolocation":"3.488064,-2.244152","venue_owner_email":"aonstadium@aon.com","venue_start_date":"2022-01-02T00:00:00.000Z","venue_end_date":"2023-03-31T00:00:00.000Z","venue_image":"https://picsum.photos/id/1047/200/200","venue_description":null}]


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    location: 'Manchester'
  })
}));

jest.mock('./fetchVenues', () => ({
  __esModule:true,
  default: async () => data
}));

it("should render a list of venues in Manchester", () => {
    
      render(<ListOfVenues/>)
      screen.getByText(/Arena 1/);
      screen.getByText(/Bills Bar/);
      screen.getByText(/Manchester/);
      screen.getByText(/A bar belonging to bill/);
      screen.getByRole("img");
     // jest.spyOn(ListOfVenues, 'fetchVenues').mockResolvedValue({ json: jest.fn().mockResolvedValue({ data }) });
    



})