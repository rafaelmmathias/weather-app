import { ErrorInline } from ".";
import renderer from "react-test-renderer";

describe("Component - ErrorInline", () => {
  it("should render the title and message", () => {
    const tree = renderer
      .create(
        <ErrorInline title="Error inline title" message="message error" />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
