import React, {useEffect, Fragment } from 'react'
import { userMyProfileAction } from '../../redux/actions/users'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '../../components/typography'
import Loader from '../../components/loader'
import Card from '../../components/cards'
 
import type { RootState } from '../../redux/reducers'
function UserProfile(){

const dispatch = useDispatch()
  const userProfile = useSelector((state: RootState) => state.userMyProfile)
  const { loading, profile} = userProfile

    useEffect( ()=>{
        dispatch(userMyProfileAction())
},[])
let profileContent
if( profile && Object.keys(profile).length >0 ) {
profileContent = <Card
    showCardHeader
    title={profile.name}
    subHeader={<Typography variant='caption' label={`@${profile.userName}`}/>}
    cardContent={
    
    <Fragment>
      <Typography variant='caption' label='Email'/>
      <Typography variant='body1' label={profile.email}/>
   <Typography variant='caption' label='Phone No'/>
   <Typography variant='body1' label={`+91-${profile.phone}`}/>
    <Typography variant='caption' label='Gender'/>
   <Typography variant='body1' label={profile.gender}/>
    <Typography variant='caption' label='Address'/>
   <Typography variant='body1' label={profile.address}/>
    </Fragment>
    }
    />
}
 
return( 
    <section className='user-profile'> 
    <div className='basic-details'>
   {loading && <Loader/>}
{profileContent}
    </div> 
    </section>
 )
}
export default UserProfile