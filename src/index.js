
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {

        axios.get("http://ansible-template-engine.herokuapp.com/form",  { crossdomain: true }).then(res => {
            const posts = res.data;
            this.setState({ posts });
        });
    }
    renderForm = () => {
        let model = this.state.posts;

        let formUI = model.map((m) => {
            let label = m.label;
            let type = m.type || "text";
            let props = m.isOptional || {};
            let name= m.name;
            let value = m.value;
            let autofocus = m.default;


            let target = label;
            value = this.state[target];

            let input =  <input {...props}
            className="form-input"
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={(e)=>{this.onChange(e, target)}}
            />;

            if (type == "radio") {
                input = m.value.map((o) => {
                    let checked = o == value;
                    return (
                        <React.Fragment label={'fr' + o}>
                        <input {...props}
                    className="form-input"
                    type={type}
                    label={o}
                    name={o}
                    checked={checked}
                    value={o}
                    onChange={(e)=>{this.onChange(e, name)}}
                    />
                    <label label={"ll" +o }>{o}</label>
                    </React.Fragment>
                );
                });
                input = <div className ="form-group-radio">{input}</div>;
            }

            if (type == "select") {
                input = m.value.map((o) => {
                    let checked = autofocus;
                    return (
                        <option
                    className="form-input"
                    label={o}
                    value={o}
                >{o.value}</option>
                );x``
                });

                console.log("Select default: ", autofocus);
                input = <select value={value} onChange={(e)=>{this.onChange(e, value)}}>{input}</select>;
            }

            if(type == "hidden"){
                input =  <input
                className="form-input"
                type={type}
                value={value}
                onChange={(e)=>{this.onChange(e, target)}}
                />;
            }


            return (
                <div label={'g' + label} className="form-group">
                <label className="form-label"
            label={"l" + label}
            htmlFor={label}>
                {m.label}
        </label>
            {input}
        </div>
        );
        });
        return formUI;
    }

    render () {
        let title = this.props.title || "Dynamic Form";

        return (
            <div className={this.props.className}>
    <h3 className="form-title">{title}</h3>
            <form className="dynamic-form" onSubmit={(e)=>{this.onSubmit(e)}}>
        {this.renderForm()}
    <div className="form-actions">
            <button type="submit">submit</button>
            </div>
            </form>
            </div>
    )
    }
}

ReactDOM.render(
<FetchDemo subreddit="reactjs"/>,
    document.getElementById('root')
);


