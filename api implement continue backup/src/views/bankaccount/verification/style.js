import { StyleSheet } from "react-native";
import {normalize} from '../../../components'
import { theme } from "../../../theme";

export default StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.primBackgroundColor,
  }),
  image: {
    width: 100,
    height: 100,
    marginTop: 30,
    alignSelf: "center",
  },
  formcolumn:{
    flexDirection: "column",
    width:'100%',
    alignItems: "center",
    justifyContent: "center",
  },
  pinwrapper: theme =>({
    flexDirection:'column',
    width:'100%',
    alignSelf:'center',
  }),
  pincontainer: theme => ({
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    position:'relative',
  }),
  pininputBox: theme =>({
    height:40,
    width:'100%',
    alignSelf:'center',
    zIndex:1,
    position:'relative',
  }),
  underlineStyleHighLighted: theme => ({
    borderColor: theme.colors.secondry,
    padding:0,
  }),
  underlineStyleBase: theme => ({
    width: theme.dimens.defaultPinCodeWidth,
    height: 45,
    padding:0,
    borderWidth: 0,
    borderBottomWidth: 1,
    color:theme.colors.descriptionColor,
    borderColor:theme.colors.descriptionColor,
    fontSize:normalize(22),
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
  }),
  visibilityIconWrapp:{
    position:'absolute',
    right:0,
    bottom:30,
    zIndex:100,
  },
  visibilityIcon:{
    width:25,
    height:20,
    
  },
  rectWrapp: {
    flexDirection:'column',
    width:'95%',
    alignSelf:'center',
    marginTop:20,
    borderRadius: 15,
    paddingHorizontal:40,
  },

  verifyBank: theme =>({
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:theme.spacing.large,
  }),
  cnfrmVerifyText: theme =>({
    fontSize:theme.typography.font_14,
    color:theme.colors.primaryTitleColor,
    fontFamily: theme.typography.fontFamilyMontserratLight,
}),
verifyLink: theme =>({
    fontSize:theme.typography.font_14,
    color:theme.colors.secondry,
    paddingLeft:theme.spacing.tiny,
    fontFamily: theme.typography.fontFamilyMontserratSemi,
}),

});