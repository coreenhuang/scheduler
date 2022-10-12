import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form interviewers={interviewers} />);

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const {getByTestId} = render(<Form interviewers={interviewers} student="Lydia Miller-Jones"/>);

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. validation is shown */
    const onSave = jest.fn();

    const {getByText, getByTestId} = render(<Form interviewers={interviewers} onSave={onSave}/>);

    const button = getByText("Save");

    fireEvent.click(button);

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    /* 3. validation is shown */
    const onSave = jest.fn();

    const {getByText, getByTestId} = render(<Form interviewers={interviewers} onSave={onSave} student="Hello"/>);

    const button = getByText("Save");

    fireEvent.click(button);

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
  
    /* 4. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    /* 5. validation is not shown */

    const onSave = jest.fn();

    const {getByText, getByTestId, queryByText} = render(<Form interviewers={interviewers} onSave={onSave} student="Hello" interviewer={interviewers[0]}/>);

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
  
    const button = getByText("Save");

    fireEvent.click(button);

    /* 6. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});