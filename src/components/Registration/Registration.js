import React from "react";
import '../SignIn/signIn.css'

const isStrongPwd = (password) => {

    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const validPassword = regExp.test(password);
    return validPassword;

};

class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            regEmail:'',
            regPassword:'',
            regName:'',
            error:''
        }
    }
    onEmailChange = (event) => {
        this.setState({regEmail:event.target.value})
    };
    onPasswordChange = (event) => {
        this.setState({regPassword:event.target.value})
    };
    onNameChange = (event) => {
        this.setState({regName:event.target.value})
    };
    onSubmit = () =>{
        const{regEmail,regPassword,regName} = this.state;
        if(regName.length === 0 ||regPassword.length === 0 ||regEmail.length === 0 ){
            this.setState({error:'Fields cannot be empty'});
            return;
        }
        if(!regEmail.includes('@')){
            this.setState({error:'Email is invalid'});
            return;
        }
        if(!isStrongPwd(regPassword)){
            this.setState({error:'Password is not strong enough'});
            return;
        }
        fetch('https://ghost-server.azurewebsites.net/api/register',{
            method:'post',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({
                name:regName,
                email: regEmail,
                password:regPassword,
            })
        })
            .then(response=> response.json())
                .then(user=>{
                if(user){
                    this.setState({error:''});
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
            .catch(error=>{
               this.setState({error:'Email already in use'});
            });
    };
    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center bg-white-30">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                                <input onChange={this.onNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="text" id="text"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"/>
                            </div>
                            <div className='error db fw6 lh-copy f6'>
                                {this.state.error}
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmit}
                                   className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="button" value="Register"/>
                        </div>
                        <div className="lh-copy mt3">
                        </div>
                    </form>
                </main>
            </article>
        );
    };
};


export default Registration;