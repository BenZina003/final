import { extendObservable } from 'mobx' ;



class UserStore {
        constructor(){
            extendObservable(this, {
                loading : false, 
                isLogging : false,
                username : '' 
            })
        }


}

export default new UserStore() ; 