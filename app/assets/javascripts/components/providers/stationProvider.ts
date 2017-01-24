import * as React from "react";
import {Station} from "../../models/station";
import PropTypes = __React.PropTypes;
import Children = __React.Children;

export interface StationProviderProps {
    stations: Station[]
}

class StationProvider extends React.Component<StationProviderProps, {}> {
    static propTypes = {
        stations: PropTypes.arrayOf(PropTypes.object)
    };

    static childContextTypes = {
        stations: PropTypes.arrayOf(PropTypes.object)
    };

    getChildContext() {
        const {stations} = this.props;
        return {stations}
    }

    render() {
        return Children.only(this.props.children)
    };
}