import Home from "../src/pages/index";
import Profiles from "../src/pages/profiles"
import Register from "../src/pages/register"
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Home", () => {
    it("renders a Home page", () => {
      render(<Home />);
      // check if all components are rendered
    });
    it("renders a Profile page", () => {
      render(<Profiles />);
      // check if all components are rendered
    //   expect(screen.getByTestId("testjest")).toBeInTheDocument();
    });
    it("renders a Register page", () => {
      render(<Register />);
      // check if all components are rendered
    //   expect(screen.getByTestId("testjest")).toBeInTheDocument();
    });
  });