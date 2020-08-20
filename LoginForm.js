import React from 'react';
import InputField from './InputField' ;
import SubmitBotton from './SubmitBotton' ; 
import UserStore from './Stores/UserStore' ; 





class LoginForm extends React.Component {

        constructor(props){
            super(props) ;
            this.state = {
                username :'' ,
                password :'' ,
                buttonDisabled : false 
            }
        }

        setInputValue (property,val){
            val=val.trim() ;
            if (val.length>12){
              return;
          }  
            this.setState({
            [property]:val 
            })
        }
        resetForm (){
            this.setState({
                username : '',
                password : '',
                buttonDisabled : false
            })
        }
      
        async doLogin (){
          if (!this.state.username){
            console.log("erreur username") ;
            return ; 
          } 
          if (!this.state.password)
          {
            console.log("erreur password") ;
            return ;
          } 
          this.setState({
            buttonDisabled:true 
           });
           console.log('oui') ;
            try {
              let res= await fetch('/login',{
                method : 'post',
                headers : {
                  'Accept' : 'Application/json',
                  'Content-Type' : 'Application/json'
                    },
                    body: JSON.stringify({
                      username:this.state.username,
                      password:this.state.password
                    })
                  }) ; 
                  let result = await res.json() ; 
                  if (result && result.success){
                    UserStore.isLoggedIn = true ;
                    UserStore.username = result.username ; 
                }
                else if (result && result.success === false ){
                  this.resetForm() ;
                  alert(result.msg) ;
                }
            }  
            catch(e){
                console.log(e) ;
                this.resetForm() ; 
            }
          }

      render(){
        return(
          

          <div className="loginForm">
           <p >login</p>
            <InputField 
                    type = 'text'
                    placeholder = 'username'
                    value = {this.state.username ? this.state.username : ''}
                    onChange = {(val)=>this.setInputValue('username',val)}
                    />
             <InputField 
                    type = "password" 
                    placeholder = "password" 
                    value = {this.state.password ? this.state.password : ''}
                    onChange = {(val)=>this.setInputValue('password',val)}
                    />
              <SubmitBotton 
                    text="login"
                    disabled={this.state.disabled}
                    onClick = {()=> this.doLogin()}
                    />
            </div>
        )
          


      }


}


export default LoginForm;
