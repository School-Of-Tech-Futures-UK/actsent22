import userEvent from "@testing-library/user-event"
import React from "react";
import { render, screen } from "@testing-library/react"
import VenueListItem from "../venuelistitem/VenueListItem"
import "@testing-library/jest-dom/extend-expect"
import '@testing-library/jest-dom';


it("Should render a venue's information - Lucy's Lounge", () => {
    render(<VenueListItem name={"Lucy's Lounge"} location={"London"} description={"My description"} image={"https://picsum.photos/id/1047/200/200"}/>);
    //console.log(screen.getByText(/Lucy's Lounge/));
    
    // Check all required info elements are displayed
    screen.getByText(/Lucy's Lounge/);
    screen.getByText(/London/);
    screen.getByText(/My description/);
    screen.getByRole("img");
    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("View Venue")
    
})

