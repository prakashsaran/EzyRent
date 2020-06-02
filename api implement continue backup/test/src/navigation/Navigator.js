import React from 'react';
import { Image,Text,View } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerActions } from 'react-navigation-drawer';

import SplashScreen from '../views/splashscreen';
import WalkthroughLandloard from '../views/walkthrough/landloard';
import WalkthroughTenant from '../views/walkthrough/tenant';
// SIGN UP SCREENS
import SignUpMobileNumber from '../views/signup/mobile/number';
import SignUpMobileOtp from '../views/signup/mobile/otp';
import SignUpMailId from '../views/signup/mail/email';
import SignUpMailOtp from '../views/signup/mail/otp';
import SignUpProfile from '../views/signup/profile';

// SIGN IN SCREENS
import SignInMobileNumber from '../views/signin/mobile/number';
import SignInMobileOtp from '../views/signin/mobile/otp';
import SignInMailId from '../views/signin/mail/email';
import SignInMailOtp from '../views/signin/mail/otp';

// DASHBOARD SCREENS
import DashboardInit from '../views/dashboard';

// PROPERTIES AND TENANTS SCREEN
import PropertiesTenants from '../views/propertiestenants';
import AddPropertyTenant from '../views/properties/add';
import ViewPropertyTenant from '../views/properties/viewtenant';
import ViewPropertyLandlord from '../views/properties/viewlandlord'
import ViewPropertyDetail from '../views/properties/viewdetail';
import ViewPropertyOwner from '../views/properties/owner';

// RENT SCREENS
import TransactionDetails from '../views/rent/transactiondetail';
import RentList from '../views/rent';

// Notifications screen
import Notifications from '../views/notification'

//More screen
import MoreInit from '../views/more';
import MyTenants from '../views/mytenants';
import MyLandloads from '../views/mylandloards';
import MyBankaccount from '../views/bankaccount/init';
import MyProfile from '../views/myprofile';
import AddBankAccount from '../views/bankaccount/add';
import EditBankAccount from '../views/bankaccount/edit';
import EditMyProfile from '../views/editprofile';
// MORE -> Transaction SCREENS
import TransactionSuccessful from '../views/transaction/success';

// Walkthrough Screen
import WalkthroughScreen from '../views/walkthrough';
// bottom navigation icons
const imageHomeActive = require('../assets/images/dashboard_active.png');
const imageHomeInActive = require('../assets/images/dashboard_inactive.png');
const imageRentActive = require('../assets/images/nav_rent_active.png');
const imageRentInActive = require('../assets/images/nav_rent_inactive.png');
const imagePropertyActive = require('../assets/images/nav_property_active.png');
const imagePropertyInActive = require('../assets/images/nav_property_inactive.png');
const imageNotificationActive = require('../assets/images/nav_notifications_active.png');
const imageNotificationInActive = require('../assets/images/nav_notifications_inactive.png');
const imageMoreActive = require('../assets/images/nav_more_active.png');
const imageMoreInActive = require('../assets/images/nav_more_inactive.png');

import {
  NAVIGATION_SPLASH_SCREEN_PATH,
  NAVIGATION_DASHBOARD_STACK_PATH,
  NAVIGATION_DASHBOARD_INIT_VIEW_PATH,
  NAVIGATION_AUTHENTICATION_PATH,
  NAVIGATION_WALKTHROUGH_LANDLORD_PATH,
  NAVIGATION_WALKTHROUGH_TENANT_PATH,
  NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH,
  NAVIGATION_SIGN_UP_MOBILE_OTP_PATH,
  NAVIGATION_SIGN_UP_MAIL_ID_PATH,
  NAVIGATION_SIGN_UP_MAIL_OTP_PATH,
  NAVIGATION_SIGN_UP_PROFILE_PATH,
  NAVIGATION_PROPERTIES_TENANTS_STACK_PATH,
  NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH,
  NAVIGATION_SIGN_IN_MOBILE_OTP_PATH,
  NAVIGATION_SIGN_IN_MAIL_ID_PATH,
  NAVIGATION_SIGN_IN_MAIL_OTP_PATH,
  NAVIGATION_RENT_STACK_PATH,
  NAVIGATION_NOTIFICATION_STACK_PATH,
  NAVIGATION_MORE_STACK_PATH,
  NAVIGATION_MORE_INIT_VIEW_PATH,
  NAVIGATION_MORE_MY_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_MY_LANDLOADS_VIEW_PATH,
  NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH,
  NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH,
  NAVIGATION_RENT_INIT_VIEW_PATH,
  NAVIGATION_RENT_TRANSACTION_DETAIL_VIEW_PATH,
  NAVIGATION_NOTIFICATION_INIT_VIEW_PATH,
  NAVIGATION_MORE_TRANSACTION_SUCCESS_VIEW_PATH,
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,
  NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH,
  NAVIGATION_MORE_EDIT_BANK_ACCOUNT_VIEW_PATH,
  NAVIGATION_MORE_EDIT_MY_PROFILE_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,
} from './routes';

import { theme } from '../theme';
const imageStyle = { width: 20, height: 20 }

const defaultHeader = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTitleStyle: {
    ...theme.typography.titleTextSemiBold,
    alignSelf: 'center',
  },
  headerBackTitle: null,
  headerTintColor: theme.colors.primary,
};


const WalkthroughStack = createStackNavigator({
  [NAVIGATION_WALKTHROUGH_LANDLORD_PATH]: WalkthroughLandloard,
  [NAVIGATION_WALKTHROUGH_TENANT_PATH]: WalkthroughTenant,
}, {initialRouteName: NAVIGATION_WALKTHROUGH_LANDLORD_PATH, headerMode: 'none'});


const AuthStack = createStackNavigator({
  [NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH]: SignUpMobileNumber,
  [NAVIGATION_SIGN_UP_MOBILE_OTP_PATH]: SignUpMobileOtp,
  [NAVIGATION_SIGN_UP_MAIL_ID_PATH]: SignUpMailId,
  [NAVIGATION_SIGN_UP_MAIL_OTP_PATH]: SignUpMailOtp,
  [NAVIGATION_SIGN_UP_PROFILE_PATH]: SignUpProfile,
  // signin navigation
  [NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH]: SignInMobileNumber,
  [NAVIGATION_SIGN_IN_MOBILE_OTP_PATH]: SignInMobileOtp,
  [NAVIGATION_SIGN_IN_MAIL_ID_PATH]: SignInMailId,
  [NAVIGATION_SIGN_IN_MAIL_OTP_PATH]: SignInMailOtp,

  [NAVIGATION_AUTHENTICATION_PATH]: SplashScreen,
}, {initialRouteName: NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH, headerMode: 'none'});

const DashboardStack = createStackNavigator({
  [NAVIGATION_DASHBOARD_INIT_VIEW_PATH]: DashboardInit,
}, {
  initialRouteName: NAVIGATION_DASHBOARD_INIT_VIEW_PATH,
  mode:"modal",
  headerMode:"none",
});

const PropertiesTenantsStack = createStackNavigator({
  [NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH]: PropertiesTenants,
  [NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH]: AddPropertyTenant,
  [NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH]: ViewPropertyDetail,
  [NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH]: ViewPropertyTenant,
  [NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH]: ViewPropertyLandlord,
  [NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH]: ViewPropertyOwner,
}, {
  initialRouteName: NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH,
  mode:"modal",
  headerMode:"none",
});

const RentStack = createStackNavigator({
  [NAVIGATION_RENT_INIT_VIEW_PATH]: RentList,
  [NAVIGATION_RENT_TRANSACTION_DETAIL_VIEW_PATH]: TransactionDetails,
}, {
  initialRouteName: NAVIGATION_RENT_INIT_VIEW_PATH,
  navigationOptions: defaultHeader,
});

const NotificationsStack = createStackNavigator({
  [NAVIGATION_NOTIFICATION_INIT_VIEW_PATH]: Notifications,
}, {
  initialRouteName: NAVIGATION_NOTIFICATION_INIT_VIEW_PATH,
  mode:"modal",
  headerMode:"none",
});
const MoreStack = createStackNavigator({
  [NAVIGATION_MORE_INIT_VIEW_PATH]: MoreInit,
  [NAVIGATION_MORE_MY_TENANTS_VIEW_PATH]: MyTenants,
  [NAVIGATION_MORE_MY_LANDLOADS_VIEW_PATH]: MyLandloads,
  [NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH]: MyBankaccount,
  [NAVIGATION_MORE_TRANSACTION_SUCCESS_VIEW_PATH]: TransactionSuccessful,
  [NAVIGATION_MORE_MY_PROFILE_VIEW_PATH]: MyProfile,
  [NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH]: AddBankAccount,
  [NAVIGATION_MORE_EDIT_BANK_ACCOUNT_VIEW_PATH]: EditBankAccount,
  [NAVIGATION_MORE_EDIT_MY_PROFILE_VIEW_PATH]: EditMyProfile,
}, {
  initialRouteName: NAVIGATION_MORE_INIT_VIEW_PATH,
  mode:"modal",
  headerMode:"none",
});

const MainAppNavigator = createBottomTabNavigator(
  {
    [NAVIGATION_DASHBOARD_STACK_PATH]: {
      screen: DashboardStack,
      navigationOptions: () => ({
        tabBarLabel: 'Dashboard',
        headerTitle:'Dashboard',
        tabBarIcon: ({ focused }) =>  <Image resizeMode={'contain'} style={imageStyle} source={focused ? imageHomeActive : imageHomeInActive} />,
      }),
    },
    [NAVIGATION_PROPERTIES_TENANTS_STACK_PATH]: {
      screen: PropertiesTenantsStack,
      navigationOptions: () => ({
        tabBarLabel: 'Properties',
        headerTitle:'Properties',
        tabBarIcon: ({ focused }) => <Image resizeMode={'contain'} style={imageStyle} source={focused ? imagePropertyActive : imagePropertyInActive} />,
      }),
    },
    [NAVIGATION_RENT_STACK_PATH]: {
      screen: RentStack,
      navigationOptions: () => ({
        tabBarLabel: 'Rent',
        headerTitle:'Rent',
        tabBarIcon: ({ focused }) => <Image resizeMode={'contain'} style={imageStyle} source={focused ? imageRentActive : imageRentInActive} />,
      }),
    },
    [NAVIGATION_NOTIFICATION_STACK_PATH]: {
      screen: NotificationsStack,
      navigationOptions: () => ({
        tabBarLabel: 'Notifications',
        headerTitle:'Notifications',
        tabBarIcon: ({ focused }) => <Image resizeMode={'contain'} style={imageStyle} source={focused ? imageNotificationActive : imageNotificationInActive} />,
      }),
    },
    [NAVIGATION_MORE_STACK_PATH]: {
      screen: MoreStack,
      navigationOptions: () => ({
        tabBarLabel: 'More',
        headerTitle:'More',
        tabBarIcon: ({ focused }) => <Image resizeMode={'contain'} style={imageStyle} source={focused ? imageMoreActive : imageMoreInActive} />,
      }),
    },
	// upcoming tab menu
  },
  {
     initialRouteName: NAVIGATION_DASHBOARD_STACK_PATH,
    tabBarOptions: {
      showLabel: true,
      activeTintColor: "#315add",
      inactiveTintColor:theme.colors.secondary,
      labelStyle: {
        fontSize: 11,
        paddingBottom:5,
        paddingTop:5,
      },
      style:{
        height:60,
        paddingTop:10,

      }
    },
  },
);

const SwitchNavigator = createSwitchNavigator({
    //SplashView:SplashScreen,
    Walkthrough:WalkthroughScreen,
    Unauthorized: AuthStack,
    Authorized: MainAppNavigator,
}, { initialRouteName: 'Walkthrough', headerMode: 'none' });

export const Navigator = createAppContainer(SwitchNavigator);
