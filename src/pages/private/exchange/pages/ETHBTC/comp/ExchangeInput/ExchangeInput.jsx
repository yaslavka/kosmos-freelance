import React from "react";
import {Input} from "reactstrap";
import {DecimalChecker} from "../../../../../../../components/utils/DecimalChecker";

class ExchangeInput extends DecimalChecker {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillReceiveProps(np) {
        if (this.props.value && !np.value) {
            this.refs.input.value = "";
        }
    }

    render() {
        // allowNaN is no valid prop for Input, remove
        var {allowNaN, ...other} = this.props;
        return (
            <Input
                ref="input"
                type="text"
                {...other}
                onPaste={this.props.onPaste || this.onPaste.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
            />
        );
    }
}

export default ExchangeInput;
