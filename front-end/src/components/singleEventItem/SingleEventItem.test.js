
import React from "react";
import { render, screen } from "@testing-library/react"
import SingleEventItem from "./SingleEventItem"
import "@testing-library/jest-dom/extend-expect"
import '@testing-library/jest-dom';


it("Should render a event's information - The Madness RETURNS", () => {
    const event = {
        "venue_id": 4,
        "event_id": 2,
        "date": "2022-02-02T00:00:00.000Z",
        "event_name": "The Madness RETURNS",
        "event_description": "Madness Show",
        "event_image": "https://m.media-amazon.com/images/M/MV5BYzIwZTk3ZmMtYzkyOS00ZjMyLTgxZGUtMjU2YmQ0YzIxNjRkXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg",
        "artist_name": "Madness",
        "artist_email": "madness@gigstr.com",
        "genre": "Two-tone",
        "status": "denied",
        "venue_name": "AON",
        "venue_geolocation": "3.488064,-2.244152",
        "venue_address": "Carrington, Manchester M31 4BH"
    }
    render(<SingleEventItem event={event} />);
    //console.log(screen.getByText(/Lucy's Lounge/));

    // Check all required info elements are displayed
    screen.getByText(/The Madness RETURNS/);             // Event name
    screen.getByText(/Madness Show/);                    // event desc
    screen.getByText(/denied/);                          // genre
    screen.getByText(/Carrington, Manchester M31 4BH/);  // address
    const image = screen.getByRole("img");               // event image

    expect(image).toHaveAttribute("src","https://m.media-amazon.com/images/M/MV5BYzIwZTk3ZmMtYzkyOS00ZjMyLTgxZGUtMjU2YmQ0YzIxNjRkXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg")


})
