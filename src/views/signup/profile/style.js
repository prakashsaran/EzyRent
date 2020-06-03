import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import {normalize} from '../../../components'

export default StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.primBackgroundColor,
  }),
  image: {
    width: 200,
    height: 200,
    marginTop: normalize(50),
    alignSelf: "center",
  },
  mobileWrapper: theme=> ({
    width: '80%',
    alignSelf: "center",
    marginBottom:theme.spacing.large*2,
    marginTop:10,
    fontFamily:theme.typography.fontFamilyOxygenBold,
  }),
  pinwrapper: theme =>({
    flexDirection:'column',
    height:60,
    width:'80%',
    alignSelf:'center',
  }),
  termsWrapp:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignItems:'center',
    width:'80%',
    alignSelf:'center',
    marginBottom:-30,
    marginTop:20,
  },
  pintitle: theme =>({
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
    fontSize:theme.typography.font_13,
    color:theme.colors.lightBlack,
  }),

  termTitle: theme =>({
    marginLeft:-10,
    fontFamily:theme.typography.primaryFont,
    fontSize:theme.typography.font_13,
    color:theme.colors.lightBlack,
  }),
  
  active_pintitle: theme =>({
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
    fontSize:theme.typography.font_13,
    color:theme.colors.secondry,
  }),
  mobileInput: theme=> ({
    borderBottomWidth:0.7,
    borderColor:theme.colors.lightBlack,
    fontSize: theme.typography.font_18,
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
    //marginTop:7,
    paddingBottom:2,
  }),
  signIn: theme =>({
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:theme.spacing.large,
  }),

  cnfrmSignText: theme =>({
    fontSize:theme.typography.font_16,
    color:theme.colors.descriptionColor,
    fontFamily: theme.typography.secondaryFont,
}),
signLink: theme =>({
    fontSize:theme.typography.font_18,
    color:theme.colors.primary,
    paddingLeft:theme.spacing.tiny,
    fontFamily: theme.typography.primaryFont,
}),
pincontainer: theme => ({
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  width:'100%',
  position:'relative',
}),
pininputBox: theme =>({
  height:50,
  width:'100%',
  alignSelf:'center',
  paddingTop:10,
}),

visibilityIcon:{
  width:25,
  height:20,
},
visibilityIconWrapp:{
  position:'absolute',
  right:0,
  top:0,
},
underlineStyleBase: theme => ({
  width: theme.dimens.defaultPinCodeWidth,
  height: 45,
  borderWidth: 0,
  borderBottomWidth: 1,
  color:theme.colors.descriptionColor,
  borderColor:theme.colors.descriptionColor,
  fontSize:theme.typography.font_22,
    fontFamily:theme.typography.primaryFont,
  fontWeight:theme.typography.fontWeightRegular,
}),
underlineStyleHighLighted: theme => ({
  borderColor: theme.colors.secondry,
}),

  footerImage: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left:0,
    right:0,
    height: 75,
  }
});
