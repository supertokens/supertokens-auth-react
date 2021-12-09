import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare class SuccessScreen extends PureComponent<PropType, unknown> {
    getIsEmbedded: () => boolean;
    render: () => JSX.Element;
}
export default SuccessScreen;
