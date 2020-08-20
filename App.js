import React from 'react';
import { observer } from "mobx-react" ;
import LoginForm from './LoginForm' ;
import UserStore from './Stores/UserStore' ; 
import SumbitBotton from './SubmitBotton';
import './App.css' ;




class App extends React.Component {
      async componentDidMount(){
        try{
           let res= await fetch('/IsloggedIn',{
              method : 'post',
              headers : {
                'Accept' : 'Application/json',
                'Content-Type' : 'Application/json'
              }
            })
              let result = await res.json() ;
              if (result && result.success){
                UserStore.loading = false ;
                UserStore.isLoggedIn = true ;
                UserStore.username = result.username ; 
              }
              else{
                UserStore.loading = false ;
                UserStore.isLoggedIn = false ;
              }
        }
          catch(e){
            UserStore.loading = false ;
            UserStore.isLoggedIn = false ;
          }

      }

      async doLogout(){
        try{
            let res= await fetch('/logout',{
              method : 'post',
              headers : {
                'Accept' : 'Application/json',
                'Content-Type' : 'Application/json'
              }
            })
              let result = await res.json() ;
              if (result && result.success){
                UserStore.isLoggedIn = false ;
                UserStore.username = '' ; 
              }
        }
          catch(e){
            console.log(e) ; 
          }

      }


      render(){
            if (UserStore.loading)
            return (
              <div className="App"> <div className="container">loading,please wait...</div></div>
            )
            else{
              if (UserStore.isLoggedIn)
              return(
                <div className="App"> <div className="container">Welcome{UserStore.username}
                 <SumbitBotton text={'log out'} disabled = {false} onClick = { ()=> this.doLogout() } />
                 </div>
                 </div>
                  )
                  else {
                    return(
                      <div className="App"> <div className="container">
                        <LoginForm />
                     </div>
                       </div>
                    )
                  }
                  
            }

          


      }


}


export default observer(App);
