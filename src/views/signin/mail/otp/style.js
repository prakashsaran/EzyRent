import { StyleSheet } from "react-native";
import {normalize} from '../../../../components'
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
  proplabel: theme=> ({
    fontSize: normalize(14),
    color: theme.colors.descriptionColor,
    fontFamily:theme.typography.secondaryFont,
    fontWeight:theme.typography.fontWeightRegular,
  }),
  propvalue: theme=> ({
    fontSize: normalize(16),
    color: theme.colors.headingColor,
     fontFamily:theme.typography.primaryFont,
    fontWeight:theme.typography.fontWeightRegular,
 }),
  mobileWrapper: theme=> ({
    width: '50%',
    alignSelf: "center",
    height: 60,
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
    fontSize:14,
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
    fontSize:normalize(22),
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
