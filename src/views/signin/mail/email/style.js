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
  changesigninmethod: theme =>({
    alignItems:'center',
    marginTop:theme.spacing.small,
  }),
  changeMethodText: theme =>({
    fontSize:theme.typography.font_14,
    color:theme.colors.secondry,
    fontFamily:theme.typography.secondaryFont,
    fontWeight:theme.typography.fontWeightRegular,
  }),
  confirmBoxTitle:theme=>({
    color:theme.colors.descriptionColor,
    fontSize:normalize(18),
    textAlign:'center',
    paddingTop:10,
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightRegular,

  }),
  eraseTitle:theme=>({
    fontSize:normalize(13),
    color:theme.colors.errorColor,
  }),

  mobileWrapper: theme=> ({
    width: '80%',
    alignSelf: "center",
    //marginVertical:theme.spacing.large,
    marginTop:10,
  }),
  mobileInput: theme=> ({
    borderBottomWidth:1,
    borderColor:theme.colors.secondry,
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
    fontSize:theme.typography.font_14,
    color:theme.colors.descriptionColor,
    fontFamily: theme.typography.secondaryFont,
}),
signLink: theme =>({
    fontSize:theme.typography.font_14,
    color:theme.colors.primary,
    paddingLeft:theme.spacing.tiny,
    fontFamily: theme.typography.primaryFont,
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
