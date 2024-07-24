import { useContext} from 'react'
import Form from './GetStarted'
import Signup from './form'
import { GlobalContext } from '../../context/context'

const FormsContainer = () => {
    const {isGetStrated}=useContext(GlobalContext)
    console.log(isGetStrated)
  {
    if(isGetStrated){
        return <Form/>
    }else{
        return <Signup/>
    }
  }
}

export default FormsContainer
