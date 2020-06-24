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
  mobileWrapper: theme=> ({
    width: '80%',
    alignSelf: "center",
    marginVertical:theme.spacing.large,
  }),
  mobileInput: theme=> ({
    borderBottomWidth:2,
    borderColor:theme.colors.secondry,
    fontSize:theme.typography.font_22,
    fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
    marginTop:7,
    paddingBottom:2,
  }),
  contactbook:theme=>({
    width:'62%',
    borderColor:theme.colors.secondry,
    fontFamily:theme.typography.secondaryFont,
  }),
  twocolumn:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'80%',
    alignSelf:'center',
  },
  fielcountrylabel: theme =>({
    flexDirection:'row',
    justifyContent:'space-between',
    width:'30%',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:theme.colors.secondry,
  }),
  fieltext:theme=>({
    color:theme.colors.primaryTitleColor,
    fontFamily:theme.typography.primaryFont,
    fontSize:theme.typography.font_16,
    fontWeight:theme.typography.fontWeightRegular,
    paddingTop:5,
  }),
  downarrowicon:{
    width:13,
    height:13,
    marginLeft:5,
    marginTop:10,
  },
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
