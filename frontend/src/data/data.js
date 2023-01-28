
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon  from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon  from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SerachIcon from "@mui/icons-material/Search"

export const SidebarData = [
     {
          icon : <DashboardIcon/>,
          heading : "Dashboard",
     },
     {
          icon : <AnalyticsIcon/>,
          heading : "Reports",
     },
     {
          icon :< SerachIcon/>,
          heading : "Search",
     },
     {
          linkTo: '/',
          icon : <GroupIcon/>,
          heading : "All Alumni",
     },
     {
          icon : <GroupIcon/>,
          heading : "BS Alumni",
     },
     {
          icon : <GroupIcon/>,
          heading : "MS Alumni",
     },
     {
          icon : <GroupIcon/>,
          heading : "PHD Alumni",
     },
     {
          icon : <SettingsIcon/>,
          heading : "Settings",
     },
     {
          icon : <LogoutIcon/>,
          heading : "Logout",
     }
]