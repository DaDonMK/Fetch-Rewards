import './App.css';
import {Component} from 'react'
import axios from 'axios'
import DateandTime from './components/DateandTime';
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export default class App extends Component{

  constructor(){
    super()
    
    this.state = {      //all state variables
      points: 0,       //ADD TRANSACTION: points
      payer: '',       //ADD TRANSACTION: payer
      time2: new Date(),    //Date variable
      pointsOff: 0,    //ADD TRANSACTION: pointsTakingOff
      balance: 0,
      finalDisplay: []
    }

    this.handleInput=this.handleInput.bind(this)
    this.handleName=this.handleName.bind(this)
    this.sendBalance=this.sendBalance.bind(this)
    this.getBalance=this.getBalance.bind(this)    //binding all class functions to this
  }

  handleName(inp){
    this.setState({payer: inp})                 //stores input from input box to payer state varibale
  }

  handleInput(inp){
    this.setState({points: inp})              //stores input from input box to points state varibale
    console.log('points ' + this.state.points)
  }

  sendBalance(){
    let time = new Date(this.state.time2).toLocaleString()       //convert time input to Date data type
    console.log(time)
    axios.post('/api/newPoints', {points: this.state.points, payer: this.state.payer, time: time})      //Sends post request to server
    .then(res => {
      console.log(res.data)
      this.setState({balance: res.data})
    })
    toast.success('TRANSACTION SENT')
  }

  async getBalance(){           //Removes points function
    let res = await axios.post('/api/getPoints', {pointsOff: this.state.pointsOff})     //await request to server
      this.setState({finalDisplay: res.data})                 //stores response to finalDisplay
      console.log(this.state.finalDisplay)        
      if(this.state.finalDisplay[0] === 'Not enough points'){
        toast.error('NOT ENOUGH POINTS')
      }else{
        toast.success('POINTS REMOVED')
      }

  }

  Time = (inp) => {
    this.setState({time2: inp})
    console.log(this.state.time2)       //Sets time in time2 state variable           
  }


  pointsOff = (inp) => {
    this.setState({pointsOff: inp})     //Sets points off from input to state variable
  }

  render(){
    return(
      <div className='Upper-Upper'>
        <section className='Upper'>
          <input className='input' type='text' placeholder='Enter Name...' onChange={(event) => this.handleName(event.target.value)}/>
          <input className='input' type='number' placeholder='Enter points to Add...' onChange={(event) => this.handleInput(event.target.value)}/>
    
          <DateTimePicker
            onChange={this.Time}
            value={this.state.time2}  
            width={200}                       //Date set input field
          />
        {console.log(this.state.time2)} 
        <div className='btn-section'>
          <button className='add-btn' onClick={this.sendBalance}>Add Transaction</button>
        </div>
        </section>

        <section className='Under-Section'>
          <input className='input' type='number' placeholder='Enter point to Remove...' onChange={(event) => this.pointsOff(event.target.value)}/>
          <div className='btn-section'>
            <button className='add-btn' onClick={this.getBalance}>
              Points
            </button> 
          </div>
        </section>
        <div className='btn-section'>   
          <DateandTime finalDisplay={this.state.finalDisplay}/>        
        </div>

      </div>
    )
  }

}