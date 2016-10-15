import * as React from "react";
export interface EntryProps {
    id: string;
}

export interface EntryState {
}

export class Entry extends React.Component<EntryProps, EntryState> {

    context: {[key: string]: any};

    static contextTypes: Object = {
        map: React.PropTypes.object
    };

    constructor(props: EntryProps) {
        super(props);
    }

    render() {
        let dictItem: any = this.context["map"];
        try {
            this.props.id.split(".").forEach((key) => {
                dictItem = dictItem[key];
            }, this);
        } catch (e) {
            dictItem = this.props.id;
        }
        return <span>{dictItem}</span>
    }
}