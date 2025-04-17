import React from "react";
import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loaderSelector } from "../common/loaderRedux/selectors";
import { PrimaryView } from "../common/components/PrimaryView/PrimaryView";
import { deletePostAction, fetchPostsAction } from "./redux/actions";
import { PostType, storeType } from "../common/store/types";
import { Card, CurvedButton, Label, LoadingIndicator, Modal } from "../common/components";
import { moderateScale } from "react-native-size-matters";
import { theme } from "../common/theme";
import { useNavigation } from "@react-navigation/native";
import { Ripple } from "../common/components/Ripple/Ripple";
import PlusSVG from "../common/theme/icons/plus.svg"
import IconCloseSVG from "../common/theme/icons/icon-close.svg"
import ElipsisSVG from "../common/theme/icons/elipsis.svg"
import { strings } from "../common/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height
  },
  flatListStyle: {
    paddingHorizontal: moderateScale(20)
  },
  itemStyle: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(35)
  },
  cardStyle: {
    padding: 0
  },
  bodyStyle: {
    paddingVertical: moderateScale(10)
  },
  numberStyle: {
    backgroundColor: theme.colors.background.base,
    width: moderateScale(25),
    height: "100%",
    position: "absolute",
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center"
  },
  headerRightStyle: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(60),
    right: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background.base,
    elevation: 2
  },
  elipsisStyle: {
    position: "absolute",
    right: 0,
    padding: moderateScale(10),
    zIndex: 1
  },
  modalStyle: {
    backgroundColor: theme.colors.background.default,
    width: "100%",
    minHeight: moderateScale(200),
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(30)
  },
  curvedButtonStyle: {
    marginTop: moderateScale(20),
    width: moderateScale(200),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonStyle: {
    position: "absolute",
    right: moderateScale(10),
    top: moderateScale(10),
    padding: moderateScale(15)
  }
})

const Menu = ({ selectedPost, isVisible, onClose }: { selectedPost: PostType, isVisible: boolean, onClose: () => void }) => {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()

  return (
    <Modal isVisible = {isVisible} onBackdropPress = {onClose}>
      <View style = {styles.modalStyle}>
        <Ripple
          testID = "close"
          accessibilityLabel = "close"
          style = {styles.closeButtonStyle}
          onPress = {onClose}
        >
          <IconCloseSVG width = {moderateScale(15)} height = {moderateScale(15)} />
        </Ripple>
        <CurvedButton
          testID = "editPost"
          accessibilityLabel = "editPost"
          buttonStyle = { { ...styles.curvedButtonStyle, backgroundColor: theme.colors.background.base } }
          title = {strings("editPost")}
          onPress = {() => {
            navigation.navigate(strings("Routes.addOrEditPost"), { post: selectedPost })
            onClose()
          }}
        />

        <CurvedButton
          testID = "deletePost"
          accessibilityLabel = "deletePost"
          buttonStyle = { { ...styles.curvedButtonStyle, backgroundColor: theme.colors.font.danger } }
          title = {strings("deletePost")}
          onPress = {() => {
            onClose()
            dispatch(deletePostAction({ postId: selectedPost.id }))
          }}
        />
      </View>
    </Modal>
  )
}

export const Dashboard = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  const { loading }:{ loading: boolean } = useSelector(loaderSelector("FetchPosts"))
  const { loading: deleteLoading }:{ loading: boolean } = useSelector(loaderSelector("DeletePost"))

  const posts = useSelector((store: storeType) => store.home.posts)
  const [isVisible, setIsVisible] = React.useState(false)
  const [selectedPost, setSelectedPost] = React.useState<PostType | null>(null)

  React.useEffect(() => {
    dispatch(fetchPostsAction())
  }, [])

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ripple style = {styles.headerRightStyle} onPress = {() => {
            navigation.navigate(strings("Routes.addOrEditPost"))
          }}>
            <PlusSVG width = {moderateScale(22)} height = {moderateScale(22)} />
          </Ripple>
        )
      }
    })
  }, [navigation])

  return (
    <PrimaryView>
      <View style = {styles.container}>
        <LoadingIndicator loading = {loading || deleteLoading} />
        <FlatList
          refreshing = {false}
          refreshControl = {<RefreshControl
            refreshing = {false}
            onRefresh = {() => {
              dispatch(fetchPostsAction())
            }} />}
          style = {styles.flatListStyle}
          data = {posts ?? []}
          ListEmptyComponent = {
            <View style = {styles.center}>
              <Label primary xl22 center title = {strings("noPostsAvailable")}/>
            </View>
          }
          renderItem = {({ item: post }: { item: PostType }) => {
            return (
              <React.Fragment>
                <Ripple style = {styles.elipsisStyle} onPress = {() => {
                  setSelectedPost(post)
                  setIsVisible(true)
                }}>
                  <ElipsisSVG width = {moderateScale(22)} height = {moderateScale(22)} />
                </Ripple>
                <Card style = {styles.cardStyle} onPress = {() => {
                  navigation.navigate(strings("Routes.comments"), { post })
                }}>

                  <View style = {styles.numberStyle}>
                    <Label s bold white title = {`${post.id}`} />
                  </View>
                  <View style = {styles.itemStyle}>
                    <Label xl medium primary title = {post.title} numberOfLines = {2} ellipsizeMode = "tail" />
                    <Label m title = {post.body.replaceAll("\n", " ")} style = {styles.bodyStyle} numberOfLines = {3} ellipsizeMode = "tail"/>
                  </View>
                </Card>
              </React.Fragment>
            )
          }}
        />
        <Menu
          selectedPost = {selectedPost as PostType}
          isVisible = {isVisible}
          onClose = {() => {
            setIsVisible(false)
            setSelectedPost(null)
          }} />
      </View>
    </PrimaryView>
  )
}
