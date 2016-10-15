import * as React from "react";
export interface DictionaryProps {
    dictionary: string;
}

export interface DictionaryState {
    map: { [key: string]: any };
    isLoading: boolean;
}

export class Dictionary extends React.Component<DictionaryProps, DictionaryState> {

    static childContextTypes = {
        map: React.PropTypes.object
    };

    constructor(props: DictionaryProps) {
        super(props);
        this.state = {map: {}, isLoading: true};
    }

    loadDictionary() {
        $.ajax({
            url: `/assets/dict/${this.props.dictionary}.json`,
            dataType: 'json',
            cache: true,
            context: this,
            success: (dictJSON: any, textStatus: string, jqXHR: JQueryXHR) => {
                console.log(dictJSON);
                this.setState({map: dictJSON, isLoading: false});
            }
        });
    }

    componentDidMount() {
        this.loadDictionary()
    }

    getChildContext() {
        return {map: this.state.map}
    }

    render() {
        return (
            <div>
                {(this.state.isLoading)? <p>Loading</p> : this.props.children}
            </div>
        );
    }
}