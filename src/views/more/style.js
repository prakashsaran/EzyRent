import { StyleSheet } from "react-native";
import { normalize } from "../../components";
export default StyleSheet.create({
    container: {
      flex: 1,
    },
    titleWrapper:{
      width:'90%',
      alignSelf:'center',
      marginVertical:20,
      flexDirection:'column',
    },

    ImageWrap:{
      flexDirection:'row',
      paddingHorizontal:normalize(20),
      marginBottom:normalize(20),
    },
    imageLeft:{ 
      width:normalize(100),
      height:normalize(100),
    },
    profilebg:{
      alignContent:'center',
      alignItems:'center',
      position:'relative',
      marginLeft: 0,
      height: 104,
      width: 104,
      borderRadius: 50,
      borderWidth: 2,
      borderBottomColor:'#9eda90',
      borderLeftColor:'#9eda90',
      borderRightColor:'#9eda90',
      borderTopColor:'#8cc3fc',
    },
    profilePik:{
      height: 100,
      width: 100,
      borderRadius: 50,
    },
    ImageWrapRight:{
      paddingLeft:15,
      paddingTop:15,
      paddingRight:10,
    },
    textHeading: theme =>({
      color:theme.colors.secondry,
      fontFamily:theme.typography.fontFamilyMontserratSemi,
      fontSize:normalize(18),
      textTransform:'uppercase',
      paddingBottom:6,
      width:normalize(160),
      flexWrap:'wrap',
    }),
    textSub: theme =>({
      color:theme.colors.secondry,
      fontSize:normalize(13),
      color:theme.colors.descriptionColor,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      marginTop:2,
      flexWrap:'wrap',
      maxWidth:normalize(140),
      flexGrow: 1,
      flexDirection:'column',
    }),
    gps_dark_icon:{
      width:13,
      height:13,
    },
    hr_line:{
      width:'85%',
      alignSelf:'center',
      height:1,
      backgroundColor:'#e9e9e9',
      //borderBottomWidth:0.5,
      color:'#484848',
    },
    ImageLeftWrap:{
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      overflow:'hidden',
    },
    MoreLinksItem:{
      width:'100%',
      flexDirection:'column',
    },
    MoreLinkswrap:{
      width:'100%',
      flexDirection:'row',
      alignItems:'center',
      padding:20,
    },
    More_icon:{
      width:30,
      height:30,
      //marginTop:15,
    },
    MoreLinks:{
      paddingLeft:10,
    },
    MoreLinksItem: theme =>({
      fontSize:20,
      color:theme.colors.secondry,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      marginBottom:0,
      lineHeight:normalize(30),
    }),
    MoreLinksItemlog: theme =>({
      color:theme.colors.secondry,
      fontSize:normalize(25),
    }),
    MoreLinksItemSub: theme =>({
      color:theme.colors.under_more,
      fontSize:normalize(14),
      lineHeight:normalize(14),
    }),
    MoreLinksItemLogout: theme =>({
      paddingTop:8,
    }),
    view_Wrap:{
      width:'100%',
      backgroundColor:'#fff',
      marginTop:normalize(80),
      paddingBottom:normalize(80),
    },
    rectView2:{
      width:'94%',
      paddingHorizontal:'4%',
      alignSelf:'center',
      marginTop:-80,
      paddingBottom:35,
    },
    // popup design 
    popupContainer: theme=>({
      width:'100%',
      backgroundColor: "rgba(230, 230, 230,1)",
      borderRadius: 5,
      borderColor: "#e6e6e6",
      borderWidth: 1,
      shadowOffset: {
        height: 5,
        width: 5
      },
      shadowColor: "rgba(0,0,0,1)",
      shadowOpacity: 0.35,
      paddingVertical:30,
      paddingHorizontal:30,
    }),
    columntitlePop1:theme=>({
      marginTop:0,
      fontFamily:'Oxygen-Bold',
      fontSize:normalize(18),
    }),
    columntitlePopDesc:theme=>({
      marginTop:20,
      fontSize:normalize(16),
      fontFamily:'Montserrat-Regular',
    }),
    popupBtms:{
      width:'100%',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'flex-end',
      paddingTop:30,
    },
    pop_wrap:{
      //backgroundColor:'#fff',
    },
    cancel:{
      color:'#315add',
      fontSize:normalize(15),
      fontFamily:'Montserrat-Regular',
    },
    ok:{
      marginLeft:25,
      fontSize:normalize(15),
      color:'#315add',
      fontFamily:'Montserrat-Regular',
    },
  });
