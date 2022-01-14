import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class LinkClickedScreen extends PureComponent<PropType, unknown> {
    getIsEmbedded: () => boolean;
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default LinkClickedScreen;
