import { StyleSheet,Dimensions } from "react-native";
import {normalize} from '../../../../components'
function isLessMarshmallow(){
  const dvcHeight = Dimensions.get('window').height;
  if(dvcHeight < 750){
    return true;
  }
  return false;
}

export default StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.primBackgroundColor,
  }),
  image: {
    width: isLessMarshmallow()?150:200,
    height: isLessMarshmallow()?150:200,
    marginTop: isLessMarshmallow()?20:50,
    marginBottom:isLessMarshmallow()?-40:0,
    alignSelf: "center",
  },
  proplabel: theme=> ({
    fontSize: normalize(14),
    color: theme.colors.descriptionColor,
    fontFamily:theme.typography.secondaryFont,
    fontWeight:theme.typography.fontWeightRegular,
  }),
  propvalue: theme=> ({
    fontSize: theme.typography.font_14,
    color: theme.colors.headingColor,
    fontFamily:theme.typography.fontFamilyMontserratSemi,
    fontWeight:theme.typography.fontWeightRegular,
 }),
  mobileWrapper: theme=> ({
    width: '50%',
    alignSelf: "center",
    height: isLessMarshmallow()?20:65,
    marginVertical:theme.spacing.large,
  }),
  mobileInput: theme=> ({
    borderBottomWidth:2,
    borderColor:theme.colors.secondry,
    fontSize: normalize(22),
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
    marginTop:7,
    paddingBottom:2,
  }),
  preprops: theme=> ({
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    justifyContent:'center',
    marginBottom:theme.spacing.tiny,
    flexWrap:'wrap',
  }),
  signIn: theme =>({
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:theme.spacing.large,
  }),

  cnfrmSignText: theme =>({
    fontSize:normalize(14),
    color:theme.colors.descriptionColor,
    fontFamily: theme.typography.secondaryFont,
}),
signLink: theme =>({
    fontSize:normalize(14),
    color:theme.colors.secondry,
    paddingLeft:theme.spacing.tiny,
    fontFamily: theme.typography.primaryFont,
}), 
  underlineStyleBase: theme => ({
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color:theme.colors.descriptionColor,
    borderColor:theme.colors.descriptionColor,
    fontSize:normalize(20),
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
}),
  underlineStyleHighLighted: theme => ({
    borderColor: theme.colors.secondry,
  }),
  changeMobile: theme =>({
    alignItems:'center',
    marginTop:theme.spacing.small,
  }),
  changeMobileText: theme =>({
    fontSize:normalize(14),
    color:theme.colors.secondry,
    fontFamily:theme.typography.secondaryFont,
    fontWeight:theme.typography.fontWeightRegular,
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
