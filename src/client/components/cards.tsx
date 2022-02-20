import React, { Fragment } from 'react'
import { Card, CardHeader, CardContent, Avatar, IconButton, Switch } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
function CardCmp(props){
    const { 
      id,
      title,
      subHeader,
      cardContent,
      avatarContent,
      showCardHeader,
      avatar,
      editable,
      switchable,
      childActions,
      editableAction,
      checked,
      handleSwitch
    } = props
return ( 
    <Card className='card'>
    {showCardHeader && <CardHeader
        avatar={
        avatarContent ? 
          <Avatar>
            {avatarContent}
          </Avatar> : avatar
        }
        action={ <Fragment>
        { (editable && <IconButton onClick={editableAction}>
            <EditIcon fontSize='small'/>
          </IconButton>)}
          {switchable && <Switch   checked={checked}
      onChange={handleSwitch} />}
          {childActions}
        </Fragment>
       
        }
        title= {title}
        subheader= {subHeader}
      />}
     {cardContent && <CardContent>
        {cardContent}
      </CardContent>}
</Card>)
}
export default CardCmp