import renderer from "react-test-renderer";
import { CSSReset } from "./CSSReset";

describe("Component - CSS Reset", () => {
  it("should match snapshot with default values", () => {
    const tree = renderer.create(<CSSReset />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
