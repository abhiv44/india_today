import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'
import Card from '../components/cards'
import { newsfeedAction, newsSubTypesAction } from '../redux/actions/users'
import type { RootState } from '../redux/reducers'
import Typography from '../components/typography'
import { viewDate} from '../config/functions'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '../components/checkbox';
function Homepage(){
const dispatch = useDispatch()
  const [check, setCheck] = useState({})
  const newsFeed = useSelector((state: RootState) => state.newsFeed)
   const newsSubType = useSelector((state: RootState) => state.newsSubType)
  const { loading, news=[]} = newsFeed
  const {loading:SubTypeLoding, subTypes=[]} = newsSubType

    useEffect(()=> {
    dispatch(newsSubTypesAction())
    dispatch(newsfeedAction([{}]))
    },[])

const handleCheck = (e) => {
const val = {...check, [e.target.id]: e.target.checked}
setCheck(val)
const filter = Object.keys(val).filter(e=>  val[e]).map(e=> ({subType: e}))
if(filter.length >0){
dispatch(newsfeedAction(filter))
} else {
dispatch(newsfeedAction([{}]))}

}

return(<section className='homepage'>
<div className='contents'>
<div className='filters'>
<Typography variant='overline' label='Filters'/>
<FormGroup>
<Typography variant='caption' label='Technology'/>
{SubTypeLoding && <Loader/>}
{subTypes.map((e)=><FormControlLabel key={e._id} control={<Checkbox id={e._id} onChange={handleCheck} checked={check[e._id] || false}/>} label={e._id.toUpperCase()} /> )}
</FormGroup>

</div>
<div className='content'>
{loading &&<Loader/>}
 
 {news.map((e)=> <Card 
 key={e._id}
 cardContent={<div className='card-content-news-feed'>
<div className='left'>
<img src='./images/aajtak.jpeg'/>
</div>
<div className='right'>
<Typography variant='button' className='subtype' label={e.subType}/>
<Typography variant='caption' label={viewDate(e.createdAt)}/>
<Typography variant='body1' label={e.title}/>
<Typography variant='caption' label='Uploaded By'/>
<Typography variant='subtitle2' label={e.author.name}/>
</div>
 </div>}
 />)}
</div>
</div>
</section>)
}
export default Homepage