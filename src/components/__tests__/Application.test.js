import React from "react";

import axios from "axios";

import { render, cleanup, getByText, getAllByTestId, getByAltText, queryByText, fireEvent, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {

    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"));
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))   

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
  });

  it('shows the delete error when failing to delete an existing appointment', async () => {

    axios.delete.mockRejectedValueOnce(new Error('error'));

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));
    
    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );
    
    fireEvent.click(getByAltText(appointment, 'Delete'));
    fireEvent.click(getByText(appointment, 'Confirm'));

    await waitForElement(() => getByText(appointment, 'Error'));
    expect(getByText(appointment, 'Unable to delete')).toBeInTheDocument();

  });
});
