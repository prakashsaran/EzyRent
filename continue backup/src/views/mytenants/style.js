import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
    },
    rectviewcustom:{
      paddingTop:0,
    },
    titleWrapper:{
      width:'90%',
      alignSelf:'center',
      marginVertical:20,
      flexDirection:'row',
      justifyContent:'space-between',
      paddingTop:10,
    },
    back_button:{
      width:30,
      height:17,
    },
    three_dots:{
      width:6,
      height:23,
      marginTop:-6,
    },
    textHeading: theme =>({
      color:theme.colors.secondry,
      fontSize:18,
      textTransform:'uppercase',
      fontWeight:'bold',
      paddingBottom:6,
    }),
    textSub: theme =>({
      color:theme.colors.secondry,
      fontSize:14,
      color:theme.colors.descriptionColor,
    }),
    gps_dark_icon:{
      width:18,
      height:18,
      marginTop:2,
    },
    ImageLeftWrap:{
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      borderBottomLeftRadius: 60,
      borderBottomRightRadius: 60,
      overflow:'hidden',
    },
    morelinksmall:{
      fontSize:14,
    },
    shadow:{
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingRight: 20,
      paddingLeft: 20,
      elevation: 8,
      minWidth: 88,
      borderRadius: 10,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 5,
      marginVertical:5,
    },
    MoreLinkswrap:{
      width:'100%',
      //height:130,
      flexDirection:'row',
      padding:20,
      paddingLeft:0,
      //flexWrap:'wrap',
      overflow:'hidden',
      borderRadius: 20,
      alignItems:'flex-start',
    },
    More_icon:{
      width:3,
      height:30,
      marginTop:5,
    },
    MoreLinks:{
      paddingLeft:10,
    },
    MoreLinksItem: theme =>({
      color:'#000',
      fontSize:14,
      fontFamily:theme.typography.fontFamilyMontserratBold,
      fontWeight:theme.typography.fontWeightSemiBold,
    }),
    MoreLinksItemSub: theme =>({
      color:theme.colors.descriptionColor,
      fontSize:14,
      paddingLeft:7,
      paddingTop:0,
      fontFamily:theme.typography.fontFamilyMontserratMedium,
      fontWeight:theme.typography.fontWeightLight,
    }),
    MoreLinksItemLocation: theme =>({
      color:theme.colors.descriptionColor,
      fontSize:13,
      paddingLeft:7,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      lineHeight:20,
    }),
    UserWrap:{
      paddingLeft:10,
    },
    contentWrap:{
      flexDirection:'row',
      paddingTop:10,
      paddingBottom:20,
    },
    User_image:{
      width:80,
      height:80,
      //resizeMode: 'contain',
      borderRadius:30,
    },
    heading_wrap:{
      flexDirection:'row',
    },
    UserWrap:{
      width:'72%',
      paddingLeft:10,
    },
  });
