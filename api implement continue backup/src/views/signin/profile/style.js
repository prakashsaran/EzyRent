import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export default StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.primBackgroundColor,
  }),
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
    alignSelf: "center",
  },
  mobileWrapper: theme=> ({
    width: '80%',
    alignSelf: "center",
    marginVertical:theme.spacing.large,
  }),
  pinwrapper: theme =>({
    flexDirection:'column',
    height:60,
    width:'80%',
    alignSelf:'center',
  }),

  pintitle: theme =>({
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
    fontSize:16,
    color:theme.colors.descriptionColor,
  }),
  mobileInput: theme=> ({
    borderBottomWidth:2,
    borderColor:theme.colors.secondry,
    fontSize: 22,
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
    marginTop:7,
    paddingBottom:2,
  }),
  signIn: theme =>({
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:theme.spacing.large,
  }),

  cnfrmSignText: theme =>({
    fontSize:16,
    color:theme.colors.descriptionColor,
    fontFamily: theme.typography.secondaryFont,
}),
signLink: theme =>({
    fontSize:18,
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
  height:60,
  width:'100%',
  alignSelf:'center',
}),

visibilityIcon:{
  width:30,
  height:25,
},
visibilityIconWrapp:{
  position:'absolute',
  right:0,
},
underlineStyleBase: theme => ({
  width: theme.dimens.defaultPinCodeWidth,
  height: 45,
  borderWidth: 0,
  borderBottomWidth: 1,
  color:theme.colors.descriptionColor,
  borderColor:theme.colors.descriptionColor,
  fontSize:22,
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
