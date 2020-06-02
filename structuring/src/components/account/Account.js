import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button, Text } from '../common';
import { logout, currentCustomer } from '../../actions';
import { NAVIGATION_ORDERS_PATH, NAVIGATION_ADDRESS_SCREEN_PATH } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { Icon } from 'react-native-elements';

const Account = ({
  customer,
  navigation,
  currentCustomer: _currentCustomer,
  logout: _logout,
}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    // ComponentDidMount
    if (!customer) {
      _currentCustomer();
    }
  }, []);

  const onLogoutPress = () => {
    _logout();
  };

  const renderCustomerData = () => {
    if (!customer) {
      return (
        <ActivityIndicator
          size="large"
          color={theme.colors.secondary}
          style={styles.activity(theme)}
        />
      );
    }

    const { email, firstname, lastname } = customer;
    return (
      <View style={styles.textContainer(theme)}>
        <View style={styles.profileinfo}>
         <Icon name="user" type="evilicon" size={80} color={'black'} />
        </View>
        <View style={styles.profileinfo}>
          <Text style={styles.customerName}>{firstname} {lastname}</Text>
          <Text style={styles.customerEmail}>{email}</Text>
        </View>
      </View>
    );
  };

  const openOrders = () => {
    navigation.navigate(NAVIGATION_ORDERS_PATH);
  };

  const openAddAddress = () => {
    navigation.navigate(NAVIGATION_ADDRESS_SCREEN_PATH);
  };

  return (
    <View style={styles.container(theme)}>
      {renderCustomerData()}
      <View style={styles.buttonsContainer(theme)}>
        {/*------ MY ORDERs ----*/}
        <TouchableOpacity onPress={openOrders} style={styles.buttonsList(theme)}>
          <View style={styles.buttonLf(theme)}>
            <Icon iconStyle={styles.iconStyle(theme)} name="book" type="foundation" size={20} color={theme.colors.thirdLightColor} />
            <Text style={styles.buttonText(theme)}>{translate('account.myOrdersButton')}</Text>
          </View>
          <View style={styles.buttonRg(theme)}>
            <Icon name="keyboard-arrow-right" type="materialIcons" size={30} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>

        {/*------ MY ADDRESS ----*/}
        <TouchableOpacity onPress={openAddAddress} style={styles.buttonsList(theme)}>
          <View style={styles.buttonLf(theme)}>
            <Icon iconStyle={styles.iconStyle(theme)} name="address" type="entypo" size={20} color={theme.colors.thirdLightColor} />
            <Text style={styles.buttonText(theme)}>{translate('account.myAddressButton')}</Text>
          </View>
          <View style={styles.buttonRg(theme)}>
            <Icon name="keyboard-arrow-right" type="materialIcons" size={30} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>

        {/*------ MY WISH LIST ----*/}
        <TouchableOpacity style={styles.buttonsList(theme)}>
          <View style={styles.buttonLf(theme)}>
            <Icon iconStyle={styles.iconStyle(theme)} name="heart" type="entypo" size={20} color={theme.colors.thirdLightColor} />
            <Text style={styles.buttonText(theme)}>My Wish List</Text>
          </View>
          <View style={styles.buttonRg(theme)}>
            <Icon name="keyboard-arrow-right" type="materialIcons" size={30} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>
        

        {/*------ My Product Reviews ----*/}
        <TouchableOpacity style={styles.buttonsList(theme)}>
          <View style={styles.buttonLf(theme)}>
            <Icon iconStyle={styles.iconStyle(theme)} name="rate-review" type="materialicon" size={20} color={theme.colors.thirdLightColor} />
            <Text style={styles.buttonText(theme)}>{'My Product Reviews'}</Text>
          </View>
          <View style={styles.buttonRg(theme)}>
            <Icon name="keyboard-arrow-right" type="materialIcons" size={30} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>
        


        {/*------ NEWSLETTER SUBSCRIPTION ----*/}
        <TouchableOpacity style={styles.buttonsList(theme)}>
          <View style={styles.buttonLf(theme)}>
            <Icon iconStyle={styles.iconStyle(theme)} name="newsletter" type="entypo" size={20} color={theme.colors.thirdLightColor} />
            <Text style={styles.buttonText(theme)}>{'Newsletter'}</Text>
          </View>
          <View style={styles.buttonRg(theme)}>
            <Icon name="keyboard-arrow-right" type="materialIcons" size={30} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>
        

        {/*------ LOGOUT BUTTON ----*/}
        <TouchableOpacity style={styles.buttonsList(theme)} onPress={onLogoutPress} >
          <View style={styles.buttonLf(theme)}>
            <Icon iconStyle={styles.iconStyle(theme)} name="logout" type="antdesign" size={20} color={theme.colors.thirdLightColor} />
            <Text style={styles.buttonText(theme)}>{translate('account.logoutButton')}</Text>
          </View>
          <View style={styles.buttonRg(theme)}>
            <Icon name="keyboard-arrow-right" type="materialIcons" size={30} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

Account.navigationOptions = {
  title: translate('account.title'),
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'flex-start',
    paddingTop: theme.spacing.large,
  }),
  activity: theme => ({
    padding: theme.spacing.large,
  }),
  center: {
    textAlign: 'center',
  },
  buttonsList: theme=> ({
      flexDirection:'row',
      justifyContent:'space-between',
      borderBottomWidth:0.4,
      borderColor:theme.colors.thirdLightColor,
      marginTop:theme.spacing.small,
    }),
  buttonsContainer: theme=> ({
    width:'95%',
    alignSelf:'center',
    }),
  buttonLf: theme=> ({
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    }),
  buttonRg: theme=>({
    backgroundColor:theme.colors.thirdLightColor,
  }),
  buttonText: theme=>({
    color:theme.colors.thirdLightColor,
    fontSize:20,
  }),
  iconStyle: theme=>({
    paddingRight:10,
  }),
  buttonChild: theme=> ({
    }),
  profileinfo:{
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  customerName:{
    textAlign:'left',
    fontSize:18,
    fontWeight:'600',
  },
  customerEmail:{
    textAlign:'left',
    fontSize:12,
    fontWeight:'500',
  },
  textContainer: theme => ({
    marginBottom: theme.spacing.large,
    flexDirection:'row',
  }),
  buttonMargin: theme => ({
    marginTop: theme.spacing.large,
  }),
});

Account.propTypes = {
  customer: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  currentCustomer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

Account.defaultProps = {
  customer: null,
};

const mapStateToProps = ({ account }) => {
  const { customer } = account;
  return { customer };
};

export default connect(mapStateToProps, { logout, currentCustomer })(Account);
