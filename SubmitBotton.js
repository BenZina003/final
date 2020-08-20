import React from 'react';




class SumbitBotton extends React.Component {
      render(){
        return(

          <div className="SumbitBotton">
              <button 
                className='btn' 
                disabled={this.props.disabled} 
                onClick={()=>this.props.onClick()}
                value={this.props.text} >
                  {this.props.text}
                </button>
                     
                     </div>
        )
          


      }


}


export default SumbitBotton;
