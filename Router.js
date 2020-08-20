const bcrypt = require('bcrypt') ;
class Router {
    constructor(app,bd){
        this.login(app,bd) ;
        this.logout(app,bd) ;
        this.isLoggedIn(app,bd) ;
    }

    login(app,bd){
            
        app.post('/login',(res,req)=> {
            let username = req.body.username ;
            let password = req.body.password ;
            console.log(username) ;
             
            
            let cols = [username] ;
            bd.query('SELECT * FROM table WHERE username = ? LIMIT 1',cols , (err,data,fields)=> {
                if (err){
                    res.json({
                        success : false , 
                        msg : 'error, please try again'
                    })
                    return ; 
                }
                if (data && data.length === 1 ){
                    bcrypt.compare(password,data[0].password , (bcryptErr,verified)=> {
                        if (verified){
                            res.session.userID = data[0].id ;
                            res.json({
                                success : true , 
                                username : data[0].username 
                            })
                            return ;
                        }
                        else {
                            res.json({
                                success : false ,
                                msg : 'invalid password'
                            })
                        }
                    }) ;
                } else {
                    res.json({
                        success : false ,
                        msg : 'invalid password'
                }) 
            }
        }) ;
    }) ;
    
}


                logout (app,bd) {
                    app.post('/logout' , (req,res)=> {
                        if (req.session.userID){
                            req.session.destroy() ;
                            req.json({
                                success : true ,
                            })
                            return true ; 
                        } else {
                            res.json({
                                success : false 
                            })
                        return false ; 
                        }
                    }) ;
                }

                isLoggedIn(app,bd){
                        app.post('/isLoggedI', (req,res)=>{
                            if (req.session.userID){
                                 let cols =[req.session.userID] ;
                                 bd.query('SELECT * FROM table WHERE username = ? LIMIT 1',cols , (err,data,fields)=> {
                                     if (data && data.length === 1 ) {
                                         res.json({
                                                success : true , 
                                                username : data[0].username 
                                         })
                                         return true ;
                                     }else {
                                         res.json({
                                             success : false
                                         })
                                     }
                                 })
                            }else {
                                res.json({
                                    success:false 
                                })
                            }
                        }) ;


                }
           

}

module.exports = Router ;