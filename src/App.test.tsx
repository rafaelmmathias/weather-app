import renderer from "react-test-renderer";
import App from "./App";

describe("Component - App", () => {
  it("should match snapshot with that requires the CSSReset and Home", () => {
    const tree = renderer.create(<App />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
