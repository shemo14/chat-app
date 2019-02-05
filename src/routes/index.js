import { createStackNavigator, createAppContainer } from 'react-navigation'
import GetName from '../components/GetName'
import OnlineUsers from "../components/OnlineUsers";
import Inbox from "../components/Inbox";

const navigation = createStackNavigator({
    getName: GetName,
    inbox: Inbox,
    onlineUsers: OnlineUsers
});

export default createAppContainer(navigation)

