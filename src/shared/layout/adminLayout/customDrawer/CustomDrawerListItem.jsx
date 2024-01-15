import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import CustomIconComponent from '../../../ui-components/button/CustomIconComponent';

const CustomDrawerListItem = ({icon,isDrawerOpen,isSelected,hasSubItems,
  isOpen,showExpandIcon,itemName,handleItemClick, marginLeft, linkItem}) => {
  return (
    <ListItem
      component={linkItem ? Link : 'div'}
      href={linkItem ? linkItem : null}
      onClick={handleItemClick}
      style={{ textDecoration: 'none', color: 'inherit' }}
      secondaryAction={
        <>
          {(hasSubItems && showExpandIcon && isDrawerOpen) && (
            <IconButton edge="end" aria-label="comments">
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>)}
        </>
      }
    >
      <ListItemButton
        selected={isSelected}
        style={{
          paddingLeft: marginLeft,
          paddingRight: 0,
          minWidth: 230
        }}
        dense
        divider={isOpen}
      >
        {icon &&
          <ListItemIcon sx={{
            width: "40px",
            minWidth: "0px",
            height: "36px",
            display: 'flex', 
            alignItems: 'center',
            justifyContent: "center",
            cursor: "pointer",
            px: 0, mx: 0
          }}>
            <CustomIconComponent iconName={icon.name} />
          </ListItemIcon>
        }
        {isDrawerOpen &&
          <ListItemText
            style={{
              whiteSpace: "pre-wrap",
              marginLeft: "0px",
              marginLeft: icon ? "0px" : "40px",
              paddingLeft: "0px",
              paddingRight: "0px"
            }}
            primary={itemName}
          />
        }
      </ListItemButton>
    </ListItem>
  );
}

export default CustomDrawerListItem;